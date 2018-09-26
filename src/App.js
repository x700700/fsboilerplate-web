import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter } from 'react-router-dom';
import { ContainerFull } from './components/tools/Flex.style'
import { Main } from "./components/app/Main";
import { authCheck } from './redux/user.actions';
import { resetError } from './redux/app.actions';


class App extends Component {
    render = () =>
        <ContainerFull>
            <BrowserRouter>
                <Main onClick={this.onClick}/>
            </BrowserRouter>
        </ContainerFull>;

    componentWillMount() {
        this.props.userActions.authCheck();
    }

    onClick = () => {
        if (this.props.appError !== null) {
            this.props.appActions.resetError();
        }
    }
}


const mapStateToProps = state => {
    return {
        isConnected: state.user.isConnected,
        appError: state.app.error,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: {
            resetError() {dispatch(resetError())},
        },
        userActions: {
            authCheck() {dispatch(authCheck())},
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

