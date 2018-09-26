import styled from 'styled-components';


export const Main = styled.div`
  min-width: ${props => props.theme.width};
  max-width: ${props => props.theme.width};
  background-color: white;
  box-shadow: 3px 3px 2px grey;
  display: flex;
  flex-direction: column;
  margin: 1.2rem;
  border-radius: 2px;
`;
