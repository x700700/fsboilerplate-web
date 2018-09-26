import React from 'react';
import exerciseImg from '../../assets/folded_card3.png';
import playBtnImg from '../../assets/playBtn.png';
import { Question, Answer } from "./SampleExercise.style";
import HoverImage from "../tools/HoverImage";


export const SampleExercise = ({ exercise, trainingHover, onClick }) => {
    const q = exercise.question || '';
    const a = exercise.answer || '';
    return (
        <HoverImage
            id='sample-exercise'
            bgImg={exerciseImg} playImg={playBtnImg} hover={trainingHover}
            onClick={() => onClick()}
        >
            <Question id='question'>
                {q}
            </Question>
            <Answer id='training-answer'>
                {a}
            </Answer>
        </HoverImage>
    );
};
