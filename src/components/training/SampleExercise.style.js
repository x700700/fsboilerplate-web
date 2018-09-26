import styled, { css } from 'styled-components';


const QnA = css`
  position: absolute;
  text-align: center;
  text-shadow: 0 2px 3px #d2b089;
  text-justify: distribute-center-last;
  white-space: nowrap;
  cursor: default;
  user-select: none;
`;
export const Question = styled.div`
  ${QnA};
  left: 17%;
  height: 40%;
  font-size: ${props => props.children.length < 10? '100%' : '80%'};
  width: ${props => props.children.length < 10? '6em' : '7.4em'};
  max-width: ${props => props.children.length < 10? '6em' : '7.4em'};
  top: ${props => props.children.length < 10? '0.9em' : '1.2em'};
`;
export const Answer = styled.div`
  ${QnA};
  left: 14%;
  height: 33%;
  font-size: ${props => props.children.length < 10? '100%' : '80%'};
  width: ${props => props.children.length < 10? '6em' : '7.4em'};
  max-width: ${props => props.children.length < 10? '6em' : '7.4em'};
  top: ${props => props.children.length < 10? '3.5em' : '4.4em'};
`;
