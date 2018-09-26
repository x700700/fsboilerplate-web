import React, { Component } from 'react';
import tada_sound from '../../assets/tada.mp3';
import coinsGif from '../../assets/coins_droping.gif';
import { Column, Container, QueContainer, QueColumn, QueBody, QueArgue, FinaleContainer, FinaleImage, FinaleScore} from './Exam.style';
import CardsDeck from '../../utils/CardsDeck';
import { Header, Footer } from './ExamComponents';
import Questioneer from './ExamQuestioneer';


class Exam extends Component {
    render = () => {
        const {name, exercise, gameStatus} = this.props;
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        const answered = CardsDeck.isTrainingIdValid(exercise.altSelectedId);
        let score = 0;
        let scoreMarginLeft = '0';
        if (cardsDeck != null && gameStatus >= 1.0) {
            score = cardsDeck.score();
            scoreMarginLeft = (score < 10 ? '1.65em' : score < 100 ? '1.3em' : '1.05em');
        }
        return (
            <Column id='exam-column'>
                <Container id='exam-container'>
                    <Header name={name}/>
                    <QueContainer id='que-container'>
                        <QueColumn id='que-column'>
                            <QueArgue id='que-argue'>
                                {exercise.question}
                            </QueArgue>
                            <QueBody id='que-body'>
                                <Questioneer exercise={exercise} answered={answered} onClick={this.altSelect}/>
                                {gameStatus >= 1.0 &&
                                    <FinaleContainer id='finale-container'>
                                        <FinaleImage src={coinsGif} alt=''/>
                                        <FinaleScore id='final-score' marginLeft={scoreMarginLeft}>
                                            {score}
                                        </FinaleScore>
                                    </FinaleContainer>
                                }
                            </QueBody>
                        </QueColumn>
                    </QueContainer>
                    <Footer exercise={exercise} gameStatus={gameStatus} answered={answered} onClick={this.nextCard}/>
                </Container>
                <audio ref={(gameDone) => { this.gameDone = gameDone; }}>
                    <source src={tada_sound} type='audio/mpeg'/>
                </audio>
            </Column>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            /*side: sideQ,
            cardHovered: false,*/
        };
        props.cardsDeckFactory.bindSetMyState(this.setMyState);
    }
    componentDidMount() {
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        if (cardsDeck !== null) {
            this.setState({
                //side: sideQ,
            });
            this.props.cardsDeckFactory.saveGameExtended();
        }
    }
    setMyState = ({name, exercise, side, gameStatus}) => {
        /* const stack = new Error().stack; // HowTo: print call stack
        console.log(stack);*/
        this.props.setMyState({name, exercise, gameStatus});
        /*if (side !== undefined) {
            this.setState({side: sideQ});
        }*/
        this.props.cardsDeckFactory.saveGameExtended();
    };

    altSelect = (exercise, altId) => {
        exercise.altSelectedId = altId;
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        this.setMyState({name: cardsDeck.name, exercise: exercise, gameStatus: cardsDeck.gameStatus});
    };
    nextCard = ({result}) => {
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        if (cardsDeck.gameStatus >= 1.0 || cardsDeck === null) {
            return;
        }
        cardsDeck.updateResult(result, false);
        if (cardsDeck.gameStatus >= 1.0) {
            this.gameDone.play();
        }
        this.setMyState({name: cardsDeck.name, exercise: cardsDeck.topExercise, gameStatus: cardsDeck.gameStatus});
    };
}
export default Exam;
