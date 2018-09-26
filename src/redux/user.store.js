import * as types from './actionsTypes';


const userReducer = (  state = {
                           duringRequest: false,
                           isAuthChecked: false,
                           isLoggedIn : false,
                           userInfo: null,
                       },
                       action) => {

    switch (action.type) {

        case types.USER_SET_NOT_LOGGED_ON:
            return {
                ...state,
                isAuthChecked: true,
                isLoggedIn : false,
                userInfo: null,
            };

        case types.USER_LOGIN_REQUEST:
            return {
                ...state,
                duringRequest: true,
            };
        case types.USER_LOGIN_RECEIVE:
            return {
                ...state,
                duringRequest: false,
                isAuthChecked: true,
                isLoggedIn: action.isLoggedIn,
                userInfo: action.user,
            };

        case types.USER_AUTHCHECK_REQUEST:
            return {
                ...state,
                duringRequest: true,
            };
        case types.USER_AUTHCHECK_RECEIVE:
            return {
                ...state,
                duringRequest: false,
                isAuthChecked: true,
                isLoggedIn: action.isLoggedIn,
                userInfo: action.user,
            };

        case types.USER_LOGOFF_REQUEST:
            return {
                ...state,
                duringRequest: true,
            };
        case types.USER_LOGOFF_RECEIVE:
            return {
                ...state,
                duringRequest: false,
                isAuthChecked: true,
                isLoggedIn: action.isLoggedIn,
                userInfo: action.user,
            };

        case types.USER_REGISTER_REQUEST:
            return {
                ...state,
                duringRequest: true,
                isAuthChecked: true,
                isLoggedIn: false,
                userInfo: null,
            };
        case types.USER_REGISTER_RECEIVE:
            return {
                ...state,
                duringRequest: false,
            };


        default:
            return state;
    }
};
export default userReducer;

