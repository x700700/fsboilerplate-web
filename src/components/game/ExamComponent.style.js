import styled from 'styled-components';
import { colorTheme } from '../../global/theme.colors';


export const HeaderContainer = styled.div`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  justify-content: center;
  max-width: 29.4em;
  color: ${colorTheme.col1_d4};
  text-decoration: underline;
  font-style: italic;
  display: flex;
  flex-direction: row;
  padding: 0.3rem;
`;

export const HeaderContent = styled.div`
  user-select: none;
  white-space: nowrap;
`;

export const FooterContainer = styled.div`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  min-height: 6em;
`;

export const NextButton = styled.img`
  align-self: center;
  width: 160px;
  height: 40px;
  padding: 0.3rem;
  margin-top: 0;
  padding-top: 0;
  display: ${props => props.show? 'initial' : 'none'};
  &:hover{
    background-color: ${colorTheme.col1_d1};
    border-radius: 6px;
    cursor: pointer;
  }
`;
