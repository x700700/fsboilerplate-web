import styled from "styled-components";


export const Text = styled.div`
  height: ${props => props.theme.height}em;
  text-align: ${props => props.theme.textAlign};
  color: ${props => props.theme.color};  
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};
  text-shadow: 0 2px 3px ${props => props.visible? props.theme.shadow : 'transparent'};
  color: ${props => props.visible? props.theme.color : 'transparent'};
  font-size: ${props => props.theme.fontSize};
  min-width: 100%;
  cursor: default;
  user-select: none;
  position: relative;
`;
export const MenuItems = styled.div`
  position: absolute;
  width: 100%;
  transform: translate(0, -75%);
  padding: 0.6rem;
  display: ${props => props.visible? 'flex' : 'none'};
  flex-direction: row;
  justify-content: space-between;
`;
export const MenuItemContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ItemImage = styled.img`
  height: ${props => props.item.height};
  width: ${props => props.item.width};
  cursor: pointer;
  opacity: 0.75;
  &:hover {
    opacity: 1;   
  }
`;
