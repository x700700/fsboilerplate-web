import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledInputContainer, Wrapper, Input } from './StyledInput.style'


ThemeProvider.defaultProps = {
    theme: {
        height: '3em',
        width: 'initial',
        margin: '0.3rem',
        border: '2px solid black',
        borderRadius: '2px',
        bgColor: 'white',
        color: 'black',
        emptyBgColor: 'red',
        fontStyle: 'oblique',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: '0',
    }
};

class StyledInput extends Component {
    render() {
        const { id } = this.props;
        const isEmpty = (!this.state.active && this.state.value.length === 0);
        return (
            <ThemeProvider theme={this.props.theme}>
                <StyledInputContainer id={id}>
                    <Wrapper id='input-wrapper'>
                        <Input
                               innerRef={x => { this.input = x }}
                               isEmpty={isEmpty} isActive={this.state.active}
                               disabled = {this.props.inputsDisabled}
                               type='text'
                               value={this.state.value}
                               onFocus={() => this.inputInside()}
                               onBlur={() => this.inputLeft()}
                               onChange={(event) => this.setState({value: event.target.value})}
                               onKeyPress={(event) => this.keyPressed(event)}
                               onKeyDown={(event) => this.keyDown(event)}
                        />
                    </Wrapper>
                </StyledInputContainer>
            </ThemeProvider>
        );
    }
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            active: false,
        };
        this.abort = false;
    }
    componentDidUpdate() {
        if (!this.state.active && this.state.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }
    keyDown = (event) => {
        //const item = this.props.item;
        // console.log(`id[${item.id}] pressed [${event.keyCode}]`);
        if (event.keyCode === 27) {
            this.abort = true;
            this.setState({value: this.props.value});
            this.input.blur();
        }
    };
    keyPressed = (event) => {
        // console.log(`id[${this.props.item.id}] pressed [${event.key}]`);
        if (event.key === 'Enter') {
            this.input.blur();
        }
    };
    inputInside = () => {
        this.setState({active: true, value: this.props.value});
    };
    inputLeft = () => {
        this.setState({active: false});
        if (!this.abort && this.state.value !== this.props.value) {
            //console.log(this.state.value);
            this.props.UpdateField(this.props.item, this.props.valType, this.state.value);
        } else {
            this.abort = false;
        }
    };
}
export default StyledInput;
