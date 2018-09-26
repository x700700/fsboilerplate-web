import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import { Header, RotateBtn, correctBtnTheme, wrongBtnTheme } from './PracticeComponents';
import PracticeCard from './PracticeCard';
import tada_sound from '../../assets/tada.mp3';
import { Row, Container, Footer } from './Practice.style';
import ButtonImage from "../tools/ButtonImage";
import result_correct_img from "../../assets/game_res_correct.png";
import result_wrong_img from "../../assets/game_res_wrong.png";


const sideQ = 1;
const sideA = 2;

class Practice extends Component {
    render = () => {
        const {name, exercise, gameStatus} = this.props;
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        return (
            <Row id='practice-row'>
                <Container id='container'>
                    <Header name={name}/>
                    <RotateBtn gameStatus={gameStatus} cardHovered={this.state.cardHovered} CardRotate={this.CardRotate} /* HowTo: send function to child */ />
                    <PracticeCard cardsDeck={cardsDeck} exercise={exercise} side={this.state.side} gameStatus={gameStatus}
                                  CardRotate={this.CardRotate} CardHovered={this.CardHovered}/>
                    <Footer>
                        <ButtonImage id='wrong-button' src={result_wrong_img} theme={wrongBtnTheme}
                                     disable={gameStatus >= 1.0}
                                     onClick={() => this.nextCard({result: false})}
                        />
                        <ProgressBar gameStatus={gameStatus}/>
                        <ButtonImage id='correct-button' src={result_correct_img} theme={correctBtnTheme}
                                     disable={gameStatus >= 1.0}
                                     onClick={() => this.nextCard({result: true})}
                        />
                    </Footer>
                </Container>

                <audio ref={(gameDone) => { this.gameDone = gameDone; }}>
                    <source src={tada_sound} type='audio/mpeg'/>
                </audio>
            </Row>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            side: sideQ,
            cardHovered: false,
        };
        props.cardsDeckFactory.bindSetMyState(this.setMyState);
    }
    componentDidMount() {
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        if (cardsDeck !== null) {
            this.setState({
                side: sideQ,
            });
            this.props.cardsDeckFactory.saveGameExtended();
        }
    }
    setMyState = ({name, exercise, side, gameStatus}) => {
        /* const stack = new Error().stack; // HowTo: print call stack
        console.log(stack);*/
        this.props.setMyState({name, exercise, gameStatus});
        if (side !== undefined) {
            this.setState({side: sideQ});
        }
        this.props.cardsDeckFactory.saveGameExtended();
    };

    nextCard = ({result}) => {
        const cardsDeck = this.props.cardsDeckFactory.getCardsDeck();
        if (cardsDeck.gameStatus >= 1.0 || cardsDeck === null) {
            return;
        }
        cardsDeck.updateResult(result, true);
        if (cardsDeck.gameStatus >= 1.0) {
            this.gameDone.play();
        }
        this.setMyState({name: cardsDeck.name, exercise: cardsDeck.topExercise, side: sideQ, gameStatus: cardsDeck.gameStatus});
    };
    CardRotate = () => {
        // Howto: set webModel called by child component, conditioned by previous webModel
        if (this.props.gameStatus < 1.0) {
            this.setState(prevState => ({
                side: prevState.side === sideQ ? sideA : sideQ
            }));
        }
    };
    CardHovered = hovered => {
        this.setState(prevState => ({
            cardHovered: hovered
        }));
    };
}
export default Practice;
