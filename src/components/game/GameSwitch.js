import React, { Component } from 'react';
import { Container, Image, Label } from './GameSwitch.style';

class GameSwitch extends Component {
    render = () => {
        const { label, icon, onClick } = this.props;
        return (
            <Container id='switch-container'>
                <Image src={icon} alt='Exam'
                     onMouseDown={onClick}
                />
                <Label>{label}</Label>
            </Container>
        );
    };
}

export default GameSwitch;
