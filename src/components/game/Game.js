import React, { Component } from 'react';
import { connect } from 'react-redux';
import consts from '../../global/consts';
import iconPractice from '../../assets/worm_practice.png';
import iconExam from '../../assets/worm_exam.png'
import Practice from './Practice';
import Exam from './Exam';
import CardsDeckFactory from '../../utils/CardsDeckFactory';
import CardsDeck from '../../utils/CardsDeck';
import { setCurrentPage, setError, setPlayedTraining } from '../../redux/app.actions';
import { saveGame, setGameType } from '../../redux/game.actions';
import { GameContainer } from './Game.style';
import GameSwitch from './GameSwitch';
import RestartButton from './RestartButton';
import GameNoExercises from './GameNoExercises';
import * as trainingsSelectors from "../../redux/trainings.store";


class Game extends Component {
    render = () => {
        const isExam = this.props.gameType === consts.GAME_TYPE_EXAM;
        const switchIcon = isExam ? iconPractice : iconExam;
        const switchType = isExam ? consts.GAME_TYPE_PRACTICE : consts.GAME_TYPE_EXAM;
        const switchLabel = isExam ? 'Practice' : 'Exam';
        const { cardsDeck } = this.cardsDeckFactory;
        // console.log('----------- ', this.props.cardsDeck, this.cardsDeckFactory.cardsDeck);
        const proper = cardsDeck && cardsDeck.initialExercises.length > 3;
        return (
            <GameContainer id='game-container'>
                {cardsDeck && !proper &&
                    <GameNoExercises trainingId={this.cardsDeckFactory.playedTrainingId}/>
                }

                {cardsDeck && proper &&
                (this.props.gameType === consts.GAME_TYPE_PRACTICE || this.props.gameType === consts.GAME_TYPE_UNKNOWN) &&
                    <Practice
                        cardsDeckFactory={this.cardsDeckFactory}
                        setMyState={this.setMyState}
                        name={this.state.name} exercise={this.state.exercise} gameStatus={this.state.gameStatus}
                    />
                }
                {cardsDeck && proper && this.props.gameType === consts.GAME_TYPE_EXAM &&
                    <Exam
                        cardsDeckFactory={this.cardsDeckFactory}
                        setMyState={this.setMyState}
                        name={this.state.name} exercise={this.state.exercise} gameStatus={this.state.gameStatus}
                    />
                }
                {cardsDeck && proper &&
                    [
                    <RestartButton gameStatus={this.state.gameStatus} gameRestart={this.gameRestart} key='restartBtn'/>,
                    <GameSwitch label={switchLabel} icon={switchIcon}
                    onClick={() => this.setGameType(switchType)} key='gameSwitchBtn'
                    />
                    ]
                }
            </GameContainer>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: 'Loading Training Practice...',
            exercise: CardsDeck.NilCard().exercise,
            gameStatus: 0.0
        };

        this.cardsDeckFactory = new CardsDeckFactory({
            trainings: props.trainings,
            playedTrainingId: props.playedTrainingId,
            gameType: props.gameType,
            storeCardsDeck: props.cardsDeck,
            reloadPlayedTraining: props.reloadPlayedTraining,

            setMyState: this.setMyState,
            setPlayedTraining: props.appActions.setPlayedTraining,
            setGameType: props.gameActions.setGameType,
            saveGame: props.gameActions.saveGame,
            setError: props.appActions.setError,
        });
        this.cardsDeckFactory.bindSetMyState(this.setMyState);
    }

    componentDidMount() {
        if (this.props.currentPage !== consts.PAGE_GAME) {
            this.props.appActions.setCurrentPage(consts.PAGE_GAME);
        }
        this.cardsDeckFactory.LoadTraining();
    }

    setGameType = (type) => {
        const cardsDeck = this.props.cardsDeck;
        cardsDeck.restart();
        localStorage.removeItem(consts.LOCAL_STORAGE_PLAYED_CARDS_DECK);
        this.cardsDeckFactory.LoadTraining();
        localStorage.setItem(consts.LOCAL_STORAGE_GAME_TYPE, type);
        this.props.gameActions.setGameType(type);
    };

    setMyState = ({name, exercise, gameStatus}) => {
        this.setState({name: name, exercise: exercise, gameStatus: gameStatus});
    };

    gameRestart = () =>  {
        const cardsDeck = this.cardsDeckFactory.getCardsDeck();
        cardsDeck.restart();
        this.setState({exercise: cardsDeck.topExercise, gameStatus: cardsDeck.gameStatus});
        localStorage.setItem(consts.LOCAL_STORAGE_PLAYED_CARDS_DECK, JSON.stringify(cardsDeck));
    };
}

// =================================================================================================================
// =================================================================================================================
const mapStateToProps = state => {
    const [trainingsMap] = trainingsSelectors.getStoreTrainings(state);
    return {
        currentPage: state.app.currentPage,
        cardsDeck: state.game.cardsDeck,
        gameType: state.game.gameType,
        playedTrainingId: state.app.playedTrainingId,
        reloadPlayedTraining: state.app.reloadPlayedTraining,
        trainings: trainingsMap,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        gameActions: {
            saveGame: (cardsDeck) => dispatch(saveGame(cardsDeck)),
            setGameType: (gameType) => dispatch(setGameType(gameType)),
        },
        appActions: {
            setError: (prefix, errorReason) => dispatch(setError(prefix, errorReason)),
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
            setPlayedTraining: (trainingId, trainingName, reload) => dispatch(setPlayedTraining(trainingId, trainingName, reload)),
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
// =================================================================================================================
// =================================================================================================================
