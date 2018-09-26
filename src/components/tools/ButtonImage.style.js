import styled from 'styled-components';

export const Button = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.hover? props.theme.bgHover : props.disable? props.theme.bgDisable || props.theme.bg : props.theme.bg};
  transition: ${props => props.theme.transition};
  opacity: ${props => props.disable? 0.5 : 1};
  margin: ${props => props.theme.margin};
  margin-top: ${props => props.theme.marginTop};
  padding: ${props => props.theme.padding || '0.5rem'};
  &:hover {
    background-color: ${props => !props.hide && !props.disable && props.theme.bgHover};
    transition: ${props => props.theme.transition};
    cursor: pointer;
  }
`;

export const ImageButton = styled.img`
  width: ${props => props.width || props.theme.width};
  height: ${props => props.height || props.theme.height};
  opacity: ${props => props.hide ? 0 : 1};
`;
