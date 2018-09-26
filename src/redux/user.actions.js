// import history from '../utils/history';
import consts from '../global/consts';
import * as types from './actionsTypes';
import { myFetch } from '../utils/myFetch';
import { setError } from './app.actions';
import {invalidateTrainings} from "./trainings.actions";


export const setNotLoggedOn = () => {
    return {
        type: types.USER_SET_NOT_LOGGED_ON,
    }
};


const requestLogin = () => {
    return {
        type: types.USER_LOGIN_REQUEST,
        user: null
    }
};
const receiveLogin = user => {
    console.info('logged in - ', user);
    return {
        type: types.USER_LOGIN_RECEIVE,
        isLoggedIn: user && user.info && user.info.id,
        user: user && user.info && user.info.id ? user : null,
    }
};
export const login = (loginInfo, history) => {
    return (dispatch, getState) => {
        if (!getState().duringRequest) {
            const url = `${consts.API_AUTH}/login`;
            dispatch(requestLogin());
            myFetch(dispatch, url, 'POST', loginInfo, fetchLoginSuccess(history), fetchLoginError);
        }
    }
};
const fetchLoginSuccess = history => (dispatch, user) => {
    dispatch(receiveLogin(user));
    history.push(consts.PAGE_MY_TRAININGS);
};
const fetchLoginError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveLogin(null));
};




const requestAuthCheck = () => {
    return {
        type: types.USER_AUTHCHECK_REQUEST,
        user: null
    }
};
const receiveAuthCheck = user => {
    // console.info('logged in - ', user);
    return {
        type: types.USER_AUTHCHECK_RECEIVE,
        isLoggedIn: user && user.info && user.info.id,
        user: user && user.info && user.info.id ? user : null,
    }
};
export const authCheck = (authCheckInfo) => {
    return (dispatch, getState) => {
        if (!getState().duringRequest) {
            const url = `${consts.API_AUTH}/check`;
            dispatch(requestAuthCheck());
            myFetch(dispatch, url, 'GET', null, fetchAuthCheckSuccess, fetchAuthCheckError);
        }
    }
};
const fetchAuthCheckSuccess = (dispatch, user) => {
    dispatch(receiveAuthCheck(user));
};
const fetchAuthCheckError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveAuthCheck(null));
};





const requestLogoff = () => {
    return {
        type: types.USER_LOGOFF_REQUEST,
        user: null
    }
};
const receiveLogoff = user => {
    console.info('logged off - ', user);
    return {
        type: types.USER_LOGOFF_RECEIVE,
        isLoggedIn: false,
        user: null,
    }
};
export const logoff = (logoffInfo) => {
    return (dispatch, getState) => {
        if (!getState().duringRequest) {
            const url = `${consts.API_AUTH}/logout`;
            dispatch(requestLogoff());
            myFetch(dispatch, url, 'GET', null, fetchLogoffSuccess, fetchLogoffError);
        }
    }
};
const fetchLogoffSuccess = (dispatch, user) => {
    dispatch(receiveLogoff(user));
    dispatch(invalidateTrainings());
};
const fetchLogoffError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveLogoff(null));
};





const requestRegister = () => {
    return {
        type: types.USER_REGISTER_REQUEST,
    }
};
const receiveRegister = user => {
    return {
        type: types.USER_REGISTER_RECEIVE,
    }
};
export const register = (registerInfo, history, modalClose) => {
    return (dispatch, getState) => {
        if (!getState().duringRequest) {
            const url = `${consts.API_AUTH}/register`;
            dispatch(requestRegister());
            myFetch(dispatch, url, 'POST', registerInfo, fetchRegisterSuccess(history, modalClose), fetchRegisterError);
        }
    }
};
const fetchRegisterSuccess = (history, modalClose) => (dispatch, user) => {
    dispatch(receiveRegister(user));
    // history.push(consts.PAGE_WELCOME);
    modalClose();
};
const fetchRegisterError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveRegister(null));
};
