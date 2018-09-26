import styled from 'styled-components';
import { colorTheme } from "../../global/theme.colors";


export const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colorTheme.col2_d1};
  color: ${colorTheme.col2_d3};
  font-family: 'Trebuchet MS', Helvetica, sans-serif;
  font-size: 18px;
  font-style: normal;
`;

export const UserImage = styled.img`
  padding: 0.3rem;
  z-index: 9;
  visibility: ${props => props.hide ? 'hidden' : 'visible'};  
`;

export const AppIconContainer = styled.div`
  display: flex;
  background-color: rgba(0,0,0, 0.2);
  height: 100%;
  width: ${props => props.width};
  margin: auto;
  margin-right: 0;
`;

export const AppIcon = styled.img`
  margin: 0;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0.3rem;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
