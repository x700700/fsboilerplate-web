import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from './Flex.style';
import { Button, ImageButton } from './ButtonImage.style';
import {colorTheme} from "../../global/theme.colors";

ThemeProvider.defaultProps = {
    theme: {
        borderColor: 'transparent',
        bg: 'transparent',
        bgHover: colorTheme.col2_m,
        bgDisable: 'transparent',
        margin: '0',
        transition: 'background-color .25s ease-in-out',
        width: '32px',
        height: '32px',
        padding: '0.5rem',
    }
};

class ButtonImage extends Component{
    render = () => {
        return (
            <Container>
                <ThemeProvider theme={this.props.theme}>
                    <Button hover={this.props.hover}
                            hide={this.props.hide}
                            disable={this.props.disable}
                            onClick={(!this.props.disable && this.props.onClick) || null}
                    >
                        <ImageButton src={this.props.src} alt='' hide={this.props.hide} width={this.props.width} height={this.props.height}/>
                    </Button>
                </ThemeProvider>
            </Container>
        );
    };
}
export default ButtonImage;
