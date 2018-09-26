import styled from 'styled-components';


export const StyledInputContainer = styled.div`
  height: ${props => props.theme.height};
  margin: ${props => props.theme.margin};
  width: ${props => props.theme.width || 'initial'}
  display: flex;
`;
export const Wrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  margin-top: ${props => props.theme.marginTop};
`;

export const Input = styled.input`
  font-style: ${props => props.theme.fontStyle};
  font-weight: ${props => props.isActive? 'normal' : props.theme.fontWeight};
  background-color: ${props => props.isActive? 'white' : props.isEmpty? props.theme.emptyBgColor : 'initial'};
  color: ${props => !props.isActive? props.theme.color : 'black'};
  cursor: ${props => props.disabled? 'default' : props.isActive? 'text' : 'pointer'};
  text-align: ${props => !props.isActive? props.theme.textAlign || 'initial' : 'initial'};
  min-height: 100%;
  width: 100%;
  border: none;
  font-size: 90%;
  padding-left: 5px;
  padding-right: 5px;
`;
