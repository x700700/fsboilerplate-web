import React, {Component} from 'react';
import { ThemeProvider } from 'styled-components';
import { themeGlobal } from '../../global/theme.global';
import { Column } from "../tools/Flex.style";
import { HouseContainer, CenterContainer, CenterColumn, WestContainer, WestColumn, EastContainer, EastColumn } from './Main.style';
import { Routes } from "../Routes";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";


export class Main extends Component {
    render = () =>
        <ThemeProvider theme={themeGlobal}>
            <Column>
                <Header/>
                <House onClick={this.props.onClick}/>
                <Footer/>
            </Column>
        </ThemeProvider>;
}

export class House extends Component {
    render = () =>
        <ThemeProvider theme={themeGlobal}>
            <HouseContainer id='house-container'>
                <West/>
                <CenterContainer
                     onMouseDown={() => this.props.onClick()}
                >
                    <CenterColumn>
                        <Routes/>
                    </CenterColumn>
                </CenterContainer>
                <East/>
            </HouseContainer>
        </ThemeProvider>;
}

export class West extends Component {
    render = () =>
        <ThemeProvider theme={themeGlobal}>
            <WestContainer id='west-container'>
                <WestColumn id='west-column'>
                </WestColumn>
            </WestContainer>
        </ThemeProvider>;
}
export class East extends Component {
    render = () =>
        <ThemeProvider theme={themeGlobal}>
            <EastContainer id='east-container'>
                <EastColumn id='east-column'>
                </EastColumn>
            </EastContainer>
        </ThemeProvider>;
}

export class Welcome extends Component {
    render = () =>
        <div id='welcome'>
            <Login/>
        </div>;
}
