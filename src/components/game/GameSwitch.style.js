import styled from 'styled-components';
import { colorTheme } from '../../global/theme.colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.3em;
  padding: 0.3rem;
`;

export const Image = styled.img`
  align-self: center;
  width: 100px;
  height: 80px;
  margin: 0.3em;
  padding: 0.3rem;
  &:hover{
    background-color: ${colorTheme.col2_m};
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: larger;
  text-align: center;
`;
