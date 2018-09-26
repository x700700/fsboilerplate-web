import React, { Component } from 'react';
import { themeGlobal } from "../../global/theme.global";
import { Container, Row, Margin } from '../tools/Flex.style'
import { Msg } from './AppError.style';
import {ThemeProvider} from "styled-components";


const theme = themeGlobal;

export default class AppError extends Component {
    render = () => {
        const { error } = this.props;
        return (
            <ThemeProvider theme={themeGlobal}>
                <Container id='app-error-container' hide={!error}>
                    <Row id='app-error-row'>
                        <Margin id='left-margin' size={theme.banners.width}/>
                        <Msg id='app-error-msg'>
                            {error}
                        </Msg>
                        <Margin id='right-margin' size={theme.banners.width}/>
                    </Row>
                </Container>
            </ThemeProvider>
        );
    }
}
