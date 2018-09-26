import styled, { css } from 'styled-components';


export const HouseContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: ${props => props.theme.house.bg};
  overflow: scroll;
  overflow-x: hidden;
`;

export const CenterContainer = styled.div`
  flex-grow: 1;
  margin-left: ${props => props.theme.banners.width};
  max-width: ${props => props.theme.house.width};
`;

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;


const SideContainer = css`
    width: ${props => props.theme.banners.width};
    background: ${props => props.theme.banners.bg};
    color: ${props => props.theme.banners.color};
    min-height: 100%;
    position: absolute;
    z-index: 5;
`;

export const WestContainer = styled.div`
  ${SideContainer};
`;
export const EastContainer = styled.div`
  ${SideContainer};
  right: 0;
`;


const Column = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

export const WestColumn = styled.div`
  ${Column};
`;
export const EastColumn = styled.div`
  ${Column};
`;
