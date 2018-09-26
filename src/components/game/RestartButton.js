import React, { Component } from 'react';
import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RestartIcon from '@material-ui/icons/Refresh';
import green from '@material-ui/core/colors/green';


const Container = styled.div`
  min-height: 2.3em;
  justify-content: center;
  flex-direction: row;
  margin: 0.3rem;
  display: flex;
`;

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const StyledButton = styled(Button)`
  && {
  display: ${props => props.gamestatus < 1 ? 'none' : 'initial'};
  height: 1.6em;
  }
`;


class RestartButton extends Component {
    render = () => {
        return (
            <Container id='restart-container'>
                <MuiThemeProvider theme={theme}>
                    <StyledButton id='restart-button' variant="contained" color='primary'
                                  gamestatus={this.props.gameStatus}
                                  onClick={this.props.gameRestart}
                    >
                        Restart
                        <RestartIcon/>
                    </StyledButton>
                </MuiThemeProvider>
            </Container>
        );
    };
}
export default RestartButton;
