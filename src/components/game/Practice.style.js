import styled from 'styled-components';
import { colorTheme } from '../../global/theme.colors';


export const Row = styled.div`
  min-height: 500px;
  width: 100%;
  color: ${colorTheme.col1_d4};
  display: flex;
  flex-direction: row;
  padding-top: 0;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
    background-color: ${colorTheme.col0_l3};
    border: 3px solid ${colorTheme.col2_d4};
    display: flex;
    flex-direction: column;
`;

export const Footer = styled.div`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
