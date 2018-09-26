import React, { Component } from 'react';
import { colorTheme } from '../../global/theme.colors';
import card_rotate_img from '../../assets/card_rotate.png';
import ButtonImage from '../tools/ButtonImage';
import { GameHeader, CardFaceContainer, CardContent, RotateContainer /*, Fireworks */} from './PracticeComponents.style';
// import fireworks_gif from '../../assets/fireworks_4.gif';


const sideQ = 1;


export const Header = ({name}) =>
    <GameHeader id='game-header'>
        <div>{name}</div>
    </GameHeader>;


const resultBtnTheme = {
    width: '32px',
    height: '32px',
    margin: '0.3rem',
    transaction: 'none',
};
export const correctBtnTheme = {
    ...resultBtnTheme,
    borderColor: colorTheme.col1_d4,
    bg: '#96ff96',
    bgHover: '#00ff00',
};
export const wrongBtnTheme = {
    ...resultBtnTheme,
    borderColor: colorTheme.col1_d4,
    bg: '#ffc877',
    bgHover: '#ff9d0c',
};


export const CardFace = ({exercise, side, SkipCardRotate, gameStatus}) => {
    // add dynamic style for font-size-adjust: 0.58;
    const cardText = (side === sideQ? exercise.question : exercise.answer);
    return (
        <CardFaceContainer id='face-container'>
            <CardContent id='card-content'
                 onMouseDown={() => SkipCardRotate()}
            >
                {cardText}
            </CardContent>
            { /* <Fireworks src={fireworks_gif} alt='' gameStatus={gameStatus}/> */ }
        </CardFaceContainer>
    );
};


const rotateBtnTheme = {
    borderColor: 'transparent',
    bg: 'transparent',
    bgHover: '#a9b9c8',
    width: '42px',
    height: '42px',
    padding: '0.1rem',
    transition: 'background-color .25s ease-in-out',
};

export class RotateBtn extends Component{
    render = () => {
        return (
            <RotateContainer>
                <ButtonImage src={card_rotate_img} theme={rotateBtnTheme}
                             hide={this.props.gameStatus >= 1.0}
                             hover={this.props.cardHovered}
                             onClick={() => this.props.CardRotate()}
                />
            </RotateContainer>
        );
    };
}
