import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colorTheme } from '../../global/theme.colors';


const BarContainer = css`
  height: 2.5em;
  margin: 0.3rem;
  margin-right: 0.5em;
  border-radius: 6px;
`;
const Container = styled.div`
  ${BarContainer};
  width: 100%;
  background-color: #ede0ff;
  border: 1px solid ${colorTheme.col1_d4};
`;

const Full = styled.div`
  ${BarContainer};
  height: 99.9%;
  margin: 0;
  background: linear-gradient(to right, rgba(139, 98, 193, 0.2), rgba(139, 98, 193, 1));
  border-radius: 0;
  width: ${props => percentageString(props.gameStatus)};
`;


class ProgressBar extends Component {
    render = () => {
        return (
            <Container id='progressbar-container'>
                <Full id='progress-full' gameStatus={this.props.gameStatus}/>
            </Container>);
    }
}

const percentageString = (f) => {
    return Math.round((f) * 100) + '%';
};

export default ProgressBar;
