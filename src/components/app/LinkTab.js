import React, { Component } from 'react';
import { ButtonContainer, Button, ImageButton, Label } from './LinkTab.style';
import {ThemeProvider} from "styled-components";


export default class LinkTab extends Component {
    render = () => {
        const { id, text, where, currentPage, onClick, hide } = this.props;
        return (
            <ThemeProvider theme={this.props.theme}>
                <ButtonContainer>
                    <Button id={id} to={where}
                            selected={currentPage === where}
                            hidden={hide}
                            onClick={onClick}
                    >
                        <ImageButton src={this.props.src} alt='' hide={this.props.hide} width={this.props.width} height={this.props.height}/>
                        <Label>
                            {text}
                        </Label>
                    </Button>
                </ButtonContainer>
            </ThemeProvider>
        );
    };
}

/*
export default class LinkTab extends Component {
    render = () => {
        const { id, text, where, currentPage, onClick, hide } = this.props;
        return (
            <LinkTabContainer id={id} to={where} selected={currentPage === where}
                              onClick={onClick} hide={hide? 'hide' : undefined}
            >
                {text}
            </LinkTabContainer>
        )
    };
}
*/
