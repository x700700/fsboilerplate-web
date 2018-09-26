import styled from 'styled-components';
import {colorTheme} from "../../global/theme.colors";


export const ExerciseCard = styled.div`
  position: relative;
  background-color: ${props => colorTheme.col2_l1};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.3rem;
  
`;
export const ExerciseDifficultyLabel = styled.label`
  position: absolute;
  font-size: 50%;
  bottom: 10px;
  left:15%;
`;
export const CardImage = styled.img`
  width: ${props => props.theme.cardWidth};
  height: ${props => props.theme.cardHeight};
  flex-grow: 1;
`;
export const CardContainer = styled.div`
  position: absolute;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-left: 1.1rem;
  padding-left: 2.7rem;
  padding-top: 0.3rem;
`;

export const DeleteReqContainer = styled.div`
  position: absolute;
  top: 4.7em;
  padding: 0.3rem;
`;
export const DeleteImage = styled.img`
  display: ${props => !props.hide? 'initial' : 'none'};
  cursor: pointer;
`;
export const DeleteApproveContainer = styled.div`
    position: absolute;
    margin-left: 4.1rem;
    top: 0.9rem;
    padding: 0.3rem;
    padding-right: 2.1rem;
`;
