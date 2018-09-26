import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const ButtonContainer = styled.div`
  min-width: ${props => props.theme.tabWidth}; 
`;

export const Button = styled(Link)`
  display: ${props => props.hidden ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  opacity: ${props => !props.selected? 0.5 : 1};
  transition: ${props => props.theme.transition};
  margin: ${props => props.theme.margin};
  margin-top: ${props => props.theme.marginTop};
  padding: ${props => props.theme.padding || '0.5rem'};
  cursor: default;
  user-select: none;
  text-decoration: none;
  color: ${props => props.selected ? props.theme.header.link.selectedColor : props.theme.header.link.color};
  &:hover {
    opacity: 1;
    transition: ${props => props.theme.transition};
    cursor: pointer;
  }
`;

export const ImageButton = styled.img`
  width: ${props => props.width || props.theme.width};
  height: ${props => props.height || props.theme.height};
  background-color: ${props => props.hover? props.theme.bgHover : props.disable? props.theme.bgDisable || props.theme.bg : props.theme.bg};
`;

export const Label = styled.div`
  font-size: 12px;
  padding-top: 3px;
  white-space: nowrap;
`;

/*
export const LinkTabContainer = styled(Link)`
  background-color: ${props => !props.selected ? props.theme.header.link.bg : props.theme.header.link.bgSelected};
  width: ${props => props.theme.header.link.width};
  color: ${props => props.selected ? props.theme.header.link.selectedColor : props.theme.header.link.color};
  visibility: ${props => props.hide ? 'hidden' : 'visible'};
  cursor: default;
  user-select: none;
  text-decoration: none;
  margin-right: 2rem;
  text-align: center;
  padding: 0;
  padding-top: 4px;
  font-size: 15px;
  font-weight: 700;
  &:hover{
    color: ${props => props.theme.header.link.hoverColor};
    text-decoration: none;
    cursor: pointer;
  }
`;
*/
