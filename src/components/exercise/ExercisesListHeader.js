import React, { Component } from 'react';
import playBtnImg from '../../assets/playBtn.png';
import askDeleteImg from '../../assets/delete_icon.png'
import { colorTheme } from "../../global/theme.colors";
import consts from '../../global/consts';
import StyledInput from '../tools/StyledInput';
import ButtonImage from "../tools/ButtonImage";
import { Container, Box } from './ExercisesListHeader.style';
// import { builtinValidId } from '../../utils/misc';

const inputTheme = {
    height: '3.3em',
    width: '60%',
    margin: '0.3rem',
    border: '2px solid ' + colorTheme.col1_d4,
    borderRadius: '5px',
    bgColor: colorTheme.col1_d4,
    color: colorTheme.col1_l3,
    emptyBgColor: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '0.5em',
};

class ExercisesListHeader extends Component {
    render = () => {
        const { training, inputsDisabled, onClickPlay, onClickDelete, UpdateField } = this.props;
        return (
            <Container id='exercise-list-container'>
                <Box>
                    <ButtonImage id='play-button' src={playBtnImg} width='50px' height='50px'
                                 disable={inputsDisabled /* || builtinValidId(training.id) */}
                                 onClick={onClickPlay}
                    />

                    <StyledInput id='training-name-input' theme={inputTheme}
                                 valType={consts.TRAINING_VAL_TYPE_NAME}
                                 value={training.name} inputsDisabled={inputsDisabled}
                                 UpdateField={UpdateField} item={training}
                    />

                    <ButtonImage id='delete-button' src={askDeleteImg}  width='50px' height='50px'
                                 disable={inputsDisabled /* || builtinValidId(training.id) */}
                                 onClick={onClickDelete}
                    />
                </Box>
            </Container>
        );
    };
}
export default ExercisesListHeader;
