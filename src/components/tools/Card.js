import React, { Component } from 'react';
import { Container } from './Flex.style';
import { Main } from "./Card.style";


class Card extends Component {
    render = () => {
        return (
            <Container id='card-container'>
                <Main id='card-main'>
                    {this.props.children}
                </Main>
            </Container>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            trainingHover: false
        };
    }
    MouseOver = () => {
        this.setState({trainingHover: true});
    };
    MouseLeave = () => {
        this.setState({trainingHover: false});
    };
}
export default Card;
