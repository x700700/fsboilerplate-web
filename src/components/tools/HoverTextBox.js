import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from './Flex.style';
import { Image, Text } from './/HoverTextBox.style';


ThemeProvider.defaultProps = {
    theme: {
        height: '4', // i.e. 4em
        bg: 'grey',
        color: 'black',
        shadow: 'orange',
        textAlign: 'center',
        imageAlign: '25%',
        margin: '0.1rem',
        padding: '0.3rem',
        fontSize: '90%',
        imgHeight: '20px',
        imgWidth: '100px',
        paddingBottom: '0.3rem',
    }
};

class HoverTextBox extends Component {
    render = () => {
        const { text, icon, isHover } = this.props;
        return (
            <ThemeProvider theme={this.props.theme}>
                <Container id='hoverTextBox-container'
                           position='relative'
                           onClick={this.props.onClick}
                >
                    <Text id='text' visible={!isHover}>
                        {text}
                    </Text>
                    <Image src={icon} alt='icon' visible={isHover}/>
                </Container>
            </ThemeProvider>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            hoverTextHover: false
        };
    }
}

export default HoverTextBox;
