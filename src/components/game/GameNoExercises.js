import React, {Component} from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import consts from '../../global/consts';
import {colorTheme} from "../../global/theme.colors";
import iconPencil from '../../assets/pencil.png';
import {setCurrentPage, setEditedTraining} from "../../redux/app.actions";
import {Route} from "react-router-dom";
import ButtonImage from "../tools/ButtonImage";


export const GameNoExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem;
`;

export const Header = styled.h3`
  margin: auto;
  margin-bottom: 3rem;
  text-align: center;
  width: max-content;
  height: fit-content;
`;

export const ButtonContainer = styled.div`
  margin: auto;
  
`;

export const Image = styled.img`
  align-self: center;
  width: 120px;
  height: 30px;
  margin: 0.3em;
  padding: 0.3rem;
  &:hover{
    background-color: ${colorTheme.col2_l1};
    cursor: pointer;
  }
`;


class GameNoExercises extends Component {
    render = () => {
        return (
            <Route render={({history}) => (
                <GameNoExercisesContainer>
                    <Header>
                        Not enough Exercises to train.
                        <br/>
                        <br/>
                        Push the pencil to add new exercises into this training.
                    </Header>
                    <ButtonContainer>
                        <ButtonImage src={iconPencil} alt='Edit' width='120px' height='35px'
                                     onClick={() => this.gotoExercisesPage(history)}
                        />
                    </ButtonContainer>
                </GameNoExercisesContainer>
            )}/>
        );
    };

    gotoExercisesPage = (history) => {
        const { trainingId } = this.props;
        console.log(`goto edit training [${trainingId}]`);
        this.props.appActions.setEditedTraining(trainingId);
        this.props.appActions.setCurrentPage(consts.PAGE_MY_EXERCISES);
        history.push(consts.PAGE_MY_EXERCISES);

    };
}


const mapStateToProps = state => {
    return {
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: {
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
            setEditedTraining: (trainingId) => dispatch(setEditedTraining(trainingId)),
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(GameNoExercises);
