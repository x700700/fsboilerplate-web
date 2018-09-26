import styled from 'styled-components';
import { colorTheme } from '../../global/theme.colors';


export const Container = styled.div`
  margin-top: 0.6rem;
`;

export const AnswerContainer = styled.div`
  text-align: center;
  margin: 0.3rem;
  padding: 0.3rem;
`;

const Button = styled.button`
  color: #343a40;
  font-weight: 400;
  text-align: center;
  border: 1px solid #343a40;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,
              background-color .15s ease-in-out,
              border-color .15s ease-in-out,
              box-shadow .15s ease-in-out;
`;

export const AnswerButton = styled(Button)`
  width: 15em;
  cursor: pointer;
  
  background-color: ${props => props.enabled? colorTheme.col2_m : props.disabled? 'transparent' : props.correct? 'green' : props.wrong? 'red' : 'initial'};
  color: ${props => props.disabled? 'transparent' : props.correct? 'white' : props.wrong? '#f8d7da' : 'initial'};
  font-size: ${props => props.correct? '125%' : props.wrong? '90%' : '100%'};
  font-weight: ${props => props.correct? 'bolder' : 'bold'};
  padding: ${props => props.correct? '0.2em' : props.wrong? '0.62em' : 'auto'};
  text-shadow: ${props => props.correct? '2px 1px 1px #332a16' : 'initial'};
  
  border: ${props => props.disabled? 'none' : 'initial'};
  box-shadow: ${props => props.disabled? 'none' : '1px 1px 5px #837963'};
  
  &:hover{
    background-color: ${props => props.enabled? colorTheme.col2_d2 : 'auto'};
  }
`;
