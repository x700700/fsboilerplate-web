import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import loginIcon from '../../assets/login-icon.png';
import plusImg from '../../assets/plus_icon.png';
import consts from '../../global/consts';
import Training from '../training/Training';
import * as trainingsSelectors from '../../redux/trainings.store';
import { getTrainings, invalidateTrainings, updateTraining, createTraining, archiveTraining } from '../../redux/trainings.actions';
import { setCurrentPage, setPlayedTraining, setEditedTraining } from '../../redux/app.actions';
import ButtonImage from "../tools/ButtonImage";
import { Container, ListContainer, ListBox} from "../training/TrainingsList.style";
import { colorTheme } from "../../global/theme.colors";


const addBtnTheme = {
    borderColor: 'transparent',
    bg: 'transparent',
    bgHover: colorTheme.col1_d1,
    transition: 'background-color .25s ease-in-out',
    marginTop: '132%',
};

class TrainingsList extends Component {
    render = () => {
        const { isAuthChecked, isLoggedIn, trainingsMap, trainingsIdArray} = this.props;
        const inputsDisabled = false;
        return (
            <Route render={({history}) => (
                <Container id='trainings-list-container'>
                    {/* isAuthChecked && !isLoggedIn &&
                        history.push(consts.PAGE_WELCOME) */
                    }
                    {trainingsMap === null &&
                        <h3>Loading...</h3>
                    }
                    {trainingsMap !== null &&
                        <ListContainer id='list-container'>
                            <ListBox id='list-box'>
                                {isAuthChecked && !isLoggedIn &&
                                    <ButtonImage id='login-redirect-button' src={loginIcon} theme={addBtnTheme} width='60px' height='60px'
                                                 disable={inputsDisabled}
                                        onClick={() => history.push(consts.PAGE_WELCOME)}
                                    />
                                }
                                {(isLoggedIn || !isAuthChecked) &&
                                    <ButtonImage id='add-button' src={plusImg} theme={addBtnTheme} width='60px' height='60px'
                                                 disable={inputsDisabled}
                                                 onClick={() => this.props.trainingsActions.createTraining()}
                                    />
                                }
                                {trainingsIdArray.map(id => {
                                    const training = trainingsMap[id];
                                    return (
                                        <Training key={training.id} training={training}
                                                  trainingPlay={() => this.trainingPlay(training, history)}
                                                  trainingEdit={() => this.trainingEdit(training, history)}
                                                  trainingRename={(training, valType, newValue) => this.trainingRename(training, valType, newValue)}
                                                  trainingArchive={(training) => this.trainingArchive(training)}
                                        />
                                    );
                                })}
                            </ListBox>
                        </ListContainer>
                    }
                </Container>
            )}/>
        );
    };
    componentDidMount() {
        if (this.props.currentPage !== consts.PAGE_MY_TRAININGS) {
            this.props.appActions.setCurrentPage(consts.PAGE_MY_TRAININGS);
        }
        this.props.trainingsActions.loadTrainings();
    }

    trainingPlay = (training, history) => {
        console.log(`Play trainingId[${training.id}] - ${training.name}`);
        this.props.appActions.setPlayedTraining(training.id, true);
        this.props.appActions.setCurrentPage(consts.PAGE_GAME);
        history.push(consts.PAGE_GAME);
    };
    trainingEdit = (training, history) => {
        console.log(`Edit trainingId[${training.id}] - ${training.name}`);
        this.props.appActions.setEditedTraining(training.id);
        this.props.appActions.setCurrentPage(consts.PAGE_MY_EXERCISES);
        history.push(consts.PAGE_MY_EXERCISES);
    };

    trainingRename = (training, valType, newValue) => {
        console.log(`renaming training id[${training.id}] - newName[${newValue}]`);
        const updatedTraining = {
            id: training.id,
            name: newValue
        };
        this.props.trainingsActions.updateTraining(updatedTraining);
    };
    trainingCreate = (training, valType, newValue) => {
        console.log(`creating new training`);
        this.props.trainingsActions.createTraining();
    };
    trainingArchive = (training) => {
        console.log(`archiving training id[${training.id}]`);
        this.props.trainingsActions.archiveTraining(training.id);
    };
}
/*TrainingsList.propTypes = {
    trainingsMap: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string
    }).isRequired
};*/



const mapStateToProps = state => {
    const [trainingsMap, trainingsIdArray] = trainingsSelectors.getStoreTrainings(state);
    return {
        isAuthChecked: state.user.isAuthChecked,
        isLoggedIn: state.user.isLoggedIn,
        currentPage: state.app.currentPage,
        trainingsMap: trainingsMap,
        trainingsIdArray: trainingsIdArray,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        trainingsActions: {
            invalidate: () => dispatch(invalidateTrainings),
            loadTrainings: () => dispatch(getTrainings()),
            updateTraining: (training) => dispatch(updateTraining(training)),
            createTraining: () => dispatch(createTraining()),
            archiveTraining: (trainingId) => dispatch(archiveTraining(trainingId)),
        },
        appActions: {
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
            setPlayedTraining: (trainingId, reload) => dispatch(setPlayedTraining(trainingId, reload)),
            setEditedTraining: (trainingId) => dispatch(setEditedTraining(trainingId)),
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TrainingsList);

/* Component @mapDispatchToProps -> action -> reducer -> action end */

