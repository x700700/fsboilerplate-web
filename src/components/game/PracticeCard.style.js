import styled from 'styled-components';
// import { colorTheme } from '../tools/colors.theme';


export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 1.5rem;
`;

export const CardSurface = styled.div`
  width: 5em;
  height: 7em;
  display: flex;
  flex-direction: row;
  margin-left: 1.75em;
  margin-right: 1.75em;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  border-radius: 8px;
  box-shadow: ${props => props.hide? 'none' : '10px 10px 5px grey'};
  background: ${props => props.cardColor}
`;


export const FinaleContainer = styled.div``;

export const FinaleChart = styled.div`
  left: 12%;
  position: absolute;
  max-width: 180px;
`;

export const FinaleGif = styled.img`
  transform: translate(0, -1em);
  position: absolute;
  height: 260px;
  width: 280px;
`;
