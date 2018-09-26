import styled from 'styled-components';


export const Container = styled.div`
    position: absolute;
    z-index: 99;
    right: 11.2%;
    left: 11.2%;
    background-color: ${props => props.theme.house.bg};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

