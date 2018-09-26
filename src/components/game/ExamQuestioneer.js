import React from 'react';
import { Container, AnswerContainer, AnswerButton } from './ExamQuestioneer.style';


const Questioneer = ({exercise, answered, onClick}) => {
    return (
        <Container>
            {exercise.alt.map(alt => {
                // console.log(`id[${alt.id}] <> select[${exercise.altSelectedId}] - correct[${exercise.id}]`);
                const correct = answered && alt.id === exercise.id;
                const wrong = answered && alt.id === exercise.altSelectedId && alt.id !== exercise.id;
                return (
                    <AnswerContainer id='answer-container' key={alt.id}>
                        <AnswerButton id='answeer-button'
                                enabled={!answered}
                                disabled={answered && !correct && !wrong}
                                correct={correct}
                                wrong={wrong}
                                onMouseDown={() => !answered && onClick(exercise, alt.id)}
                        >
                            {alt.answer}
                        </AnswerButton>
                    </AnswerContainer>
                );
            })}
        </Container>
    );
};
export default Questioneer;
