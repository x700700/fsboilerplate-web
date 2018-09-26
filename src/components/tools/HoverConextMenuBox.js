import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from './Flex.style';
import { Text, MenuItems, MenuItemContainer, ItemImage } from './HoverContextMenuBox.style';


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
        paddingBottom: '0.3rem'
    }
};

class HoverContextMenuBox extends Component {
    render = () => {
        const { id, text, menuItems, isHover, onClick } = this.props;
        return (
            <ThemeProvider theme={this.props.theme}>
                <Container id={id} position='relative'
                >
                    <Text id='text' visible={!isHover}>
                        {text}
                    </Text>
                    <MenuItems id='menu-items-container' visible={isHover}>
                        {menuItems.map(x =>
                            <MenuItemContainer id='menu-item-container' key={x.action}>
                                <ItemImage id='item-image' key={x.action} src={x.icon} alt='*' item={x}
                                           onClick={() => onClick(x.action)}
                                />
                            </MenuItemContainer>
                        )}
                    </MenuItems>
                </Container>
            </ThemeProvider>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            hoverTextHover: false
        };
        // console.log('*** ', props.menuItems)
    }
}

export default HoverContextMenuBox;
