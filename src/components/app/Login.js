import React, {  Component } from "react";
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Container, Column, Item, TitleContainer, Title, LogoffContainer, LogoffBox, SignupContainer, SignupBox } from './Login.style';
import {login, logoff} from '../../redux/user.actions';
import consts from "../../global/consts";
import {setCurrentPage} from "../../redux/app.actions";
import {Route} from "react-router-dom";
import Signup from "./Signup";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

class Login extends Component {
    render() {
        const { isAuthChecked, duringRequest, isLoggedIn, userInfo } = this.props;
        return (
            <Route render={({history}) => (
                <Container>
                {isAuthChecked && !duringRequest && isLoggedIn &&
                    <Title>
                        <h2>Hello</h2>
                        <h1>{userInfo.nickName}</h1>
                        <h3>Enjoy fsboilerplate..!</h3>
                        <LogoffContainer>
                            <LogoffBox>
                                <Button id='logout-button' variant="outlined"
                                        size='medium'
                                        onClick={() => this.logoff()}
                                >
                                    Log out
                                </Button>
                            </LogoffBox>
                        </LogoffContainer>
                    </Title>
                }
                {!duringRequest && !isLoggedIn &&
                    [
                        <TitleContainer key='title'>
                            <Title>
                                Please sign in to start fsboilerplate
                            </Title>
                        </TitleContainer>,
                        <form noValidate autoComplete="off" key='form'>
                            <Column>

                                <TextField
                                    id="name"
                                    label="Name"
                                    placeholder=""
                                    margin="normal"
                                    onChange={this.onTextFieldUsernameChange}
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    placeholder=""
                                    margin="normal"
                                    onChange={this.onTextFieldPasswordChange}
                                />
                                <Item>
                                    <Button id='login-button' variant="contained" color='primary'
                                            size='large'
                                            onClick={() => this.login(history)}
                                    >
                                        Sign In
                                    </Button>
                                </Item>
                                <SignupContainer>
                                    <SignupBox href='#'
                                               onClick={() => this.modalOpen()}
                                    >
                                        Sign-Up
                                    </SignupBox>
                                </SignupContainer>
                            </Column>
                        </form>
                    ]
                }
                        <Modal
                            aria-labelledby="Sign Up"
                            aria-describedby="Sign up to fsboilerplate"
                            open={this.state.modalOpen}
                            onClose={this.modalClose}
                        >
                            <Signup modalClose={this.modalClose}/>
                        </Modal>
            </Container>
            )}/>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            password: '',
            modalOpen: false,
        };
    }
    componentDidMount() {
        if (this.props.currentPage !== consts.PAGE_WELCOME) {
            this.props.appActions.setCurrentPage(consts.PAGE_WELCOME);
        }
    }

    onTextFieldUsernameChange = (e) => {
        this.setState({
            nickName: e.target.value
        });
    };
    onTextFieldPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    login = (history) => {
        const { nickName, password } = this.state;
        // console.log(`Login - user[${nickName}] password[${password}]`);
        const loginInfo = {
            nickName: nickName,
            password: password,
        };
        this.props.userActions.login(loginInfo, history);
    };
    logoff = () => {
        this.props.userActions.logoff();
    };

    modalOpen = () => {
        this.setState({ modalOpen: true });
    };

    modalClose = () => {
        this.setState({ modalOpen: false });
    };
}



const mapStateToProps = state => {
    return {
        isAuthChecked: state.user.isAuthChecked,
        duringRequest: state.user.duringRequest,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        currentPage: state.app.currentPage,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        userActions: {
            login: (loginInfo, history) => dispatch(login(loginInfo, history)),
            logoff: () => dispatch(logoff()),
        },
        appActions: {
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
