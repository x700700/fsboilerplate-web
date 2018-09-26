import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import consts from '../../global/consts';
import Exercise from '../exercise/Exercise';
import { getEditedTrainingIfNeeded, invalidateEditedTraining, addExercise, updateExercise, delExercise, selectExercise4Delete } from '../../redux/exercises.actions';
import * as exercisesSelectors from '../../redux/exercises.store';
import { setCurrentPage, setEditedTraining, setPlayedTraining } from '../../redux/app.actions';
import {archiveTraining, getTrainings, updateTraining} from '../../redux/trainings.actions';
import { saveGame } from '../../redux/game.actions';
import ExercisesListHeader from './ExercisesListHeader';
import ButtonImage from "../tools/ButtonImage";
import plusImg from "../../assets/plus_icon.png";
import { colorTheme } from "../../global/theme.colors";
import { Container, ListContainer, ListBox } from './ExercisesList.style';
import * as trainingsSelectors from "../../redux/trainings.store";
import {builtinValidId, modelValidId} from '../../utils/misc';
import Modal from "@material-ui/core/Modal/Modal";
import DelTrainingConfirm from "./DelTrainingConfirm";


const addBtnTheme = {
    borderColor: 'transparent',
    bg: 'transparent',
    bgHover: colorTheme.col1_d1,
    transition: 'background-color .25s ease-in-out',
    marginTop: '50%',
};

class ExercisesList extends Component {
    render = () => {
        const {isAuthChecked, isLoggedIn, editedTrainingId, selected4DeleteExerciseId, didInvalidate, isFetching, training, exercisesMap, exercisesIdArray} = this.props;
        const inputsDisabled = modelValidId(selected4DeleteExerciseId);
        return (
            <Route render={({history}) => (
                <Container id='exercise-list-container'>
                    {isAuthChecked && !isLoggedIn &&
                        history.push(consts.PAGE_WELCOME)
                    }
                    {(!modelValidId(editedTrainingId) || (didInvalidate && !isFetching)) &&
                        <h3>No training is selected for edit. Go to "My Trainings" tab.</h3>
                    }
                    {modelValidId(editedTrainingId) && training === null && isFetching &&
                        <h3>Loading...</h3>
                    }
                    {training !== null && modelValidId(editedTrainingId) &&
                        <ListContainer id='list-container'
                             onClick={() => this.SelectExercise4Delete(-1)}
                        >
                            <ExercisesListHeader id='exercise-list-header'
                                                 training={training} inputsDisabled={inputsDisabled}
                                                 UpdateField={(training, valType, newValue) => this.trainingRename(training, valType, newValue)}
                                                 onClickPlay={() => this.PlayTraining(history)}
                                                 onClickDelete={() => this.modalOpen()}
                            />

                            <ListBox>
                                {(isLoggedIn || !isAuthChecked) &&
                                    <ButtonImage id='add-button' src={plusImg} theme={addBtnTheme} width='60px'
                                                 height='60px'
                                                 disable={inputsDisabled || builtinValidId(training.id)}
                                                 onClick={() => this.props.exercisesActions.addExercise(training.id)}
                                    />
                                }
                                {exercisesIdArray.map(id => {
                                    const exercise = exercisesMap[id];
                                    return (
                                        <Exercise key={exercise.id} exercise={exercise}
                                                  selected4DeleteExerciseId={selected4DeleteExerciseId}
                                                  SelectExercise4Delete={(id) => this.SelectExercise4Delete(id)} // HowTo: Send func to Child, let him send the parms
                                                  ExerciseDelete={() => this.exerciseDelete(exercise)}
                                                  ExerciseUpdate={(exercise, valType, newValue) => this.exerciseUpdate(exercise, valType, newValue)}
                                        />
                                    );
                                })}
                            </ListBox>
                        </ListContainer>
                    }
                    <Modal
                        aria-labelledby="Delete Training Confirmation"
                        aria-describedby="Delete Training Confirmation"
                        open={this.state.modalOpen}
                        onClose={this.modalClose}
                    >
                        <DelTrainingConfirm onClickCancel={this.modalClose}
                                            onClickDelete={this.ArchiveTraining}
                        />
                    </Modal>
                </Container>
            )}/>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        };
    }
    componentDidMount() {
        if (this.props.currentPage !== consts.PAGE_MY_EXERCISES) {
            this.props.appActions.setCurrentPage(consts.PAGE_MY_EXERCISES);
        }

        let loadTrainingId = this.props.editedTrainingId;
        /* if (!this.props.trainingsMap || this.props.trainingsMap.length <= 0) {
            console.log('trainingsMap is null.');
            this.props.exercisesActions.invalidate();
            localStorage.setItem(global.LOCAL_STORAGE_EDITED_TRAINING_ID, -1);
        } else { */
        const localStorageEditedTrainingId = localStorage.getItem(consts.LOCAL_STORAGE_EDITED_TRAINING_ID);
        if (modelValidId(this.props.editedTrainingId)) {
            //console.log('Loading Exercises for trainingId: ' + this.props.editedTrainingId);
            localStorage.setItem(consts.LOCAL_STORAGE_EDITED_TRAINING_ID, this.props.editedTrainingId);
        } else if (localStorageEditedTrainingId && modelValidId(localStorageEditedTrainingId)) {
            console.log(`Restore editedTrainingId [${localStorageEditedTrainingId}] from local storage.`);
            this.props.appActions.setEditedTraining(localStorageEditedTrainingId);
            loadTrainingId = localStorageEditedTrainingId;
        }
        if (modelValidId(loadTrainingId)) {
            this.props.exercisesActions.loadExercises(loadTrainingId);
            this.props.exercisesActions.selectExercise4Delete(-1);
        }
    }

    trainingRename = (training, valType, newValue) => {
        console.log(`renaming training id[${training.id}] - newName[${newValue}]`);
        const updatedTraining = {
            id: training.id,
            name: newValue
        };
        this.props.trainingsActions.updateTraining(updatedTraining);
    };
    PlayTraining = (history) => {
        const training = this.props.training;
        console.log(`Play trainingId[${training.id}] - ${training.name}`);
        this.props.gameActions.saveGame(null);
        this.props.appActions.setPlayedTraining(training.id, true);
        this.props.appActions.setCurrentPage(consts.PAGE_GAME);
        history.push(consts.PAGE_GAME);
    };
    ArchiveTraining = (history) => {
        const training = this.props.training;
        console.log(`Deleting trainingId[${training.id}] - ${training.name}`);
        this.props.trainingsActions.archiveTraining(training.id);
        this.props.appActions.setEditedTraining(-1);
        localStorage.removeItem(consts.LOCAL_STORAGE_EDITED_TRAINING_ID);
        history.push(consts.PAGE_MY_TRAININGS);
    };

    SelectExercise4Delete = (id) => {
        if (modelValidId(id) || (modelValidId(this.props.selected4DeleteExerciseId) && Date.now() - this.props.selected4DeleteTime > 200)) {
            this.props.exercisesActions.selectExercise4Delete(id);
        }
    };
    exerciseDelete = (exercise) => {
        console.log(`deleting exercise id[${exercise.id}]`);
        this.props.exercisesActions.delExercise(exercise);
    };
    exerciseUpdate = (exercise, valType, newValue) => {
        console.log(`updating exercise id[${exercise.id}] - valType[${valType}] - newValue[${newValue}]`);
        const updatedExercise = _.cloneDeep(exercise);
        if (valType === consts.EXERCISE_VAL_TYPE_QUESTION) {
            updatedExercise.question = newValue;
        } else if (valType === consts.EXERCISE_VAL_TYPE_ANSWER) {
            updatedExercise.answer = newValue;
        }
        this.props.exercisesActions.updateExercise(updatedExercise);
    };


    modalOpen = () => {
        this.setState({ modalOpen: true });
    };

    modalClose = () => {
        this.setState({ modalOpen: false });
    };
}


const mapStateToProps = state => {
    const [trainingsMap] = trainingsSelectors.getStoreTrainings(state);
    const [exercisesMap, exercisesIdArray] = exercisesSelectors.getExercises(state);
    return {
        isAuthChecked: state.user.isAuthChecked,
        isLoggedIn: state.user.isLoggedIn,
        currentPage: state.app.currentPage,
        trainingsMap: trainingsMap,
        editedTrainingId: state.app.editedTrainingId,
        didInvalidate: state.exercises.didInvalidate,
        isFetching: state.exercises.isFetching,
        training: state.exercises.training,
        exercisesMap: exercisesMap,
        exercisesIdArray: exercisesIdArray,
        selected4DeleteExerciseId: state.exercises.selected4DeleteExerciseId,
        selected4DeleteTime: state.exercises.selected4DeleteTime,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        trainingsActions: {
            getTrainings: () => dispatch(getTrainings()),
            updateTraining: (training) => dispatch(updateTraining(training)),
            archiveTraining: (trainingId) => dispatch(archiveTraining(trainingId)),
        },
        exercisesActions: {
            invalidate: () => dispatch(invalidateEditedTraining()),
            loadExercises: (trainingId) => dispatch(getEditedTrainingIfNeeded(trainingId)),
            addExercise: (trainingId) => dispatch(addExercise(trainingId)),
            updateExercise: (exercise) => dispatch(updateExercise(exercise)),
            selectExercise4Delete: (id) => dispatch(selectExercise4Delete(id)),
            delExercise: (exercise) => dispatch(delExercise(exercise)),
        },
        appActions: {
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
            setEditedTraining: (trainingId) => dispatch(setEditedTraining(trainingId)),
            setPlayedTraining: (trainingId, reload) => dispatch(setPlayedTraining(trainingId, reload)),
        },
        gameActions: {
            saveGame: (cardsDeck) => dispatch(saveGame(cardsDeck))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ExercisesList);

/* Component @mapDispatchToProps -> action -> reducer -> action end */

