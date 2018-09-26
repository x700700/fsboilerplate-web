import styled from 'styled-components';
import { colorTheme } from '../../global/theme.colors';


export const GameHeader = styled.div`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  justify-content: center;
  background-color: ${colorTheme.col0_d3};
  color: ${colorTheme.col0_l3};
  border-bottom: 1px solid ${colorTheme.col1_d4};
  display: flex;
  flex-direction: row;
  cursor: default;
  user-select: none;
`;

export const CardFaceContainer = styled.div`
  position: relative;
`;
export const CardContent = styled.div`

`;

export const Fireworks = styled.img`
  width: 175px;
  height: 239px;
  display: ${props => props.gameStatus >= 1.0 ? 'initial' : 'none'};
`;


export const RotateContainer = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

