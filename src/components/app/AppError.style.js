import styled from 'styled-components';


export const Msg = styled.div`
  flex-grow: 1;
  margin: 0.6rem;
  padding: 0.3rem;
  font-size: 90%;
  background-color: ${props => props.theme.error.bg};
  color: ${props => props.theme.error.color};
`;
