import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import consts from '../../global/consts';
import askDeleteImg from '../../assets/delete_icon.png';
import deleteImg from '../../assets/delete_approve_icon.png';
import exerciseImg from '../../assets/folded_card4.png'
import { colorTheme } from "../../global/theme.colors";
import StyledInput from '../tools/StyledInput';
import { Container } from '../tools/Flex.style';
import { CardContainer, CardImage, ExerciseCard, ExerciseDifficultyLabel, DeleteReqContainer, DeleteApproveContainer, DeleteImage } from './Exercise.style';
import {modelValidId} from "../../utils/misc";


const theme = {
    cardWidth: '200px',
    cardHeight: '144px',
};
const inputTheme = {
    height: '2.2em',
    width: '78%',
    bgColor: 'rgba(255,250,241,0.3)',
    border: '2px solid ' + colorTheme.col1_d4,
    borderRadius: '5px',
    emptyBgColor: 'rgba(255, 126, 126, 0.3)',
    marginTop: '-1em',
};

class Exercise extends Component {
    render = () => {
        const {exercise, selected4DeleteExerciseId} = this.props;
        const inputsDisabled = modelValidId(selected4DeleteExerciseId);
        return (
            <ThemeProvider theme={theme}>
                <Container id='exercise-container' margin='0.6rem'>
                    <ExerciseCard id='exercise-card'>
                        <ExerciseDifficultyLabel id='difficulty-label'>Difficulty</ExerciseDifficultyLabel>
                        <CardImage src={exerciseImg} alt=''/>
                        <CardContainer id='card-container'>

                                <StyledInput id='exercise-update-button' theme={inputTheme}
                                             valType={consts.EXERCISE_VAL_TYPE_QUESTION}
                                             value={exercise.question} inputsDisabled={inputsDisabled}
                                             UpdateField={this.props.ExerciseUpdate} item={exercise}/>
                                <StyledInput id='exercise-delete-button' theme={inputTheme}
                                             valType={consts.EXERCISE_VAL_TYPE_ANSWER}
                                             value={exercise.answer} inputsDisabled={inputsDisabled}
                                             UpdateField={this.props.ExerciseUpdate} item={exercise}/>

                        </CardContainer>
                        <DeleteReqContainer id='del-req-container'
                             onMouseDown={() => this.props.SelectExercise4Delete(exercise.id)}
                        >
                            <DeleteImage src={askDeleteImg} alt='Delete' height='25' width='16'
                                         hide={modelValidId(selected4DeleteExerciseId)}
                            />
                        </DeleteReqContainer>
                        <DeleteApproveContainer id='del-approve-container'
                             onMouseDown={() => this.props.ExerciseDelete()}
                        >
                            <DeleteImage src={deleteImg} alt='Delete?' height='114' width='88'
                                         hide={exercise.id !== selected4DeleteExerciseId}
                            />
                        </DeleteApproveContainer>
                    </ExerciseCard>
                </Container>
            </ThemeProvider>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            askDelete: false,
        };
    }
    componentWillMount() {
        /*this.setState({ q: exercise.question,
                        a: exercise.answer,
        });*/
    }
    AskDelete = () => {
        this.setState({askDelete: true})
    };
}
Exercise.propTypes = {
    exercise: PropTypes.object.isRequired,
    SelectExercise4Delete: PropTypes.func.isRequired,
    //trainingPlay: PropTypes.func.isRequired,
    //trainingEdit: PropTypes.func.isRequired,
};
export default Exercise;

