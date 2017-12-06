import {LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_PENDING} from '../actions'

const defaultState = {
    isLoginPending:false,
    loginError:'',
    loggedInUser:{}
}

export function loggedInUser(state=defaultState,action){
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedInUser: action.loggedInUser,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.isLoginError,
            };
        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending,
            };
        default:
            return state;
    }
}