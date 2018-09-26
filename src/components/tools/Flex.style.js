import styled from 'styled-components';


export const Container = styled.div`
  display: ${props => props.hide ? 'none' : 'initial'};
  position: ${props => props.position || 'initial'};
  background-color: ${props => props.theme.bg};
  height: ${props => props.theme.height};
  margin: ${props => props.margin};
  padding-bottom: ${props => props.theme.paddingBottom};
`;

export const ContainerFull = styled.div`
  height: 100%;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
export const Column = styled(Flex)`
  flex-direction: column;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.color};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  width: ${props => props.width};
  height: ${props => props.height};
`;
export const Row = styled(Flex)`
  flex-direction: row;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.color};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const Margin = styled.div`
  min-width: ${props => props.size};
`;
