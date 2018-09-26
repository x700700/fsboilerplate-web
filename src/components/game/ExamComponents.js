import React from 'react';
import arrowNextImg from '../../assets/arrow_next.png';
import { HeaderContainer, HeaderContent, FooterContainer, NextButton } from './ExamComponent.style';
import ProgressBar from './ProgressBar';



export const Header = ({name}) => {
    return (
        <HeaderContainer id='header-container'>
            <HeaderContent id='header-content'>
                {name}
            </HeaderContent>
        </HeaderContainer>
    );
};


export const Footer = ({exercise, gameStatus, answered, onClick}) => {
    const result = (exercise.altSelectedId === exercise.id);
    return (
        <FooterContainer>
            <ProgressBar gameStatus={gameStatus}/>
            <NextButton id='next-button' src={arrowNextImg} alt='Next'
                        show={answered}
                        onMouseDown={() => onClick({result: result})}
            />
        </FooterContainer>
    );
};
