import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Column } from '../tools/Flex.style'
import { Bottom } from './Footer.style';
import AppError from './AppError';
import { setError, resetError } from '../../redux/app.actions';
import {themeGlobal} from "../../global/theme.global";
import {ThemeProvider} from "styled-components";


class Footer extends Component {
    render = () => {
        return (
            <ThemeProvider theme={themeGlobal}>
                <Container id='footer-container'>
                    <Column id='footer-column'>
                        <AppError error={this.props.appError}/>
                        <Bottom id='bottom'>
                            2018 FSB &reg;
                        </Bottom>
                    </Column>
                </Container>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        appError: state.app.error,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: {
            setError: (error) => dispatch(setError(error)),
            resetError: () => dispatch(resetError())
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
