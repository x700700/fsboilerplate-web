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
export const Image = styled.img`
  position: absolute;
  transform: ${props => 'translate(' + props.theme.imageAlign + ', -' + props.theme.height/1.7 + 'em)'};
  height: ${props => props.theme.imgHeight};
  width: ${props => props.theme.imgWidth};
  display: ${props => props.visible? 'initial' : 'none'};
`;
