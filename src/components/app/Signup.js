import React, {  Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Column, Item, CloseIconContainer, TitleContainer, Title, ErrorContainer, ErrorRow, ErrorLabel} from './Signup.style';
import {register} from '../../redux/user.actions';
import {setCurrentPage, setError} from '../../redux/app.actions';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    close: {
        width: '50px',
        height: '50px',
        cursor: 'pointer',

    },
});


class Signup extends Component {
    render() {
        const { classes, duringRequest, isLoggedIn, error } = this.props;
        return (
            <Route render={({history}) => (
                <Container>
                {!duringRequest && !isLoggedIn &&
                    [
                        <TitleContainer key='title'>
                            <CloseIconContainer>
                                <CloseIcon className={classes.close}
                                           onClick={() => this.props.modalClose()}
                                />
                            </CloseIconContainer>
                            <Title>
                                Register your nick name & password for fsboilerplate:
                            </Title>
                        </TitleContainer>,
                        <form autoComplete='off' key='form' noValidate>
                            <Column>

                                <TextField
                                    id='register-name'
                                    value={this.state.nickName}
                                    label='Name'
                                    placeholder=''
                                    autoComplete='off'
                                    autoFocus={true}
                                    margin='normal'
                                    onChange={this.onTextFieldUsernameChange}
                                    error={this.state.errorFieldName}
                                    inputRef={x => { this.fieldNickName = x }}
                                />
                                <TextField
                                    id='register-password'
                                    value={this.state.password}
                                    label='Password'
                                    type='password'
                                    autoComplete='off'
                                    placeholder=''
                                    margin='normal'
                                    onChange={this.onTextFieldPasswordChange}
                                    error={this.state.errorFieldPassword}
                                    inputRef={x => { this.fieldPassword = x }}
                                />
                                <TextField
                                    id='register-repassword'
                                    value={this.state.repassword}
                                    label='Repeat Password'
                                    type='password'
                                    autoComplete='off'
                                    placeholder=''
                                    margin='normal'
                                    onChange={this.onTextFieldRePasswordChange}
                                />
                                <Item>
                                    <Button id='signup-button' variant='contained' color='primary'
                                            size='large'
                                            onClick={() => this.register(history)}
                                    >
                                        Register
                                    </Button>
                                </Item>
                            </Column>
                        </form>,
                        <ErrorContainer key='signup-error'>
                            {error &&
                                <ErrorRow key='error-row'>
                                    <ErrorLabel>
                                        {error}
                                    </ErrorLabel>
                                </ErrorRow>
                            }
                        </ErrorContainer>
                    ]
                }
            </Container>
            )}/>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            password: '',
            repassword: '',
            errorFieldName: false,
            errorFieldPassword: false,
        };
    }
    componentDidMount() {
    }

    onTextFieldUsernameChange = (e) => {
        this.setState({
            nickName: e.target.value,
            errorFieldName: false,
        });
    };
    onTextFieldPasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            errorFieldPassword: false,
        });
    };
    onTextFieldRePasswordChange = (e) => {
        this.setState({
            repassword: e.target.value
        });
    };

    register = (history) => {
        const { nickName, password, repassword } = this.state;
        // console.log(`register - user[${nickName}] password[${password}]`);
        if (nickName && password && password === repassword) {
            const registerInfo = {
                nickName: nickName,
                password: password,
            };
            this.props.userActions.register(registerInfo, history, this.props.modalClose);
        } else if (!nickName) {
            this.props.appActions.setError('register', 'Please enter a unique nick name.');
            this.setState({ errorFieldName: true});
            this.fieldNickName.focus();
        } else if (!password && !repassword) {
            this.props.appActions.setError('register', 'Please enter a password.');
            this.fieldPassword.focus();
        } else {
            this.props.appActions.setError('register', 'Passwords are not match, please re-enter password.');
            this.setState({ password: '', repassword: '', errorFieldPassword: true });
            this.fieldPassword.focus();
        }
    };
}



const mapStateToProps = state => {
    return {
        duringRequest: state.user.duringRequest,
        isLoggedIn: state.user.isLoggedIn,
        currentPage: state.app.currentPage,
        error: state.app.error,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        userActions: {
            register: (registerInfo, history, modalClose) => dispatch(register(registerInfo, history, modalClose)),
        },
        appActions: {
            setError: (prefix, msg) => dispatch(setError(prefix, msg)),
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup));
