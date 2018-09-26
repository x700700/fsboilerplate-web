import styled from 'styled-components';
import { colorTheme } from '../../global/theme.colors';


export const Column = styled.div`
  color: ${colorTheme.col1_d4};
  display: flex;
  flex-direction: column;
  padding-top: 1.2rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 30em;
  height: 30.1em;
  background-color: ${colorTheme.col1_l3};
  border: 1px solid ${colorTheme.col2_d4};
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
`;

export const QueContainer = styled.div`
`;

export const QueColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 22rem;
  padding: 0.6rem;
`;

export const QueArgue = styled.label`
  min-height: 1.8em;
  max-width: 13.9em;
  background-color: ${colorTheme.col0_l2};
  color:${colorTheme.col1_d4};
  text-align: center;
  font-size: 200%;
  font-weight: bold;
  border-radius: 3px;
  margin: 0.3rem;
  padding: 0.3rem;
  user-select: none;
  white-space: nowrap;
`;

export const QueBody = styled.div`
  min-height: 16.3em;
  position: relative;
`;

export const FinaleContainer = styled.div`
  position: absolute;
  font-size: 120px;
  font-weight: bolder;
  color: ${colorTheme.col1_d3};
  user-select: none;

`;

export const FinaleImage = styled.img`
  position: absolute;
  pointer-events: none;
  transform: translate(12%, 0);
  width: 370px;
  height: 350px;
`;

export const FinaleScore = styled.p`
  margin-top: 0;
  margin-left: ${props => props.marginLeft};
`;
