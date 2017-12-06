import * as firebase from 'firebase';

export const LOGIN_SUCCESS = "Login_Success";
export const LOGIN_ERROR = "Login_Error";
export const LOGIN_PENDING = "Login_Pending";
export const SET_CHAT_NAME = "CHAT_NAME";
export const SET_USER_AVATAR = "SET_USER_AVATAR";

export const setUserName = (name) => ({
    type: SET_CHAT_NAME,
    name
});

export const setUserAvatar = (avatar) => ({
    type: SET_USER_AVATAR,
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

export function setLoginSuccess(loggedInUser){
    return{
        type:LOGIN_SUCCESS,
        loggedInUser
    };
}

export function setLoginPending(isLoginPending){
    return{
        type:LOGIN_PENDING,
        isLoginPending
    };
}

export function setLoginError(isLoginError){
    return{
        type:LOGIN_ERROR,
        isLoginError
    };
}

export function login(email,password) {
    return async dispatch => {
        dispatch(setLoginPending(true));
        try {
            let usersRef = firebase.database().ref('/Users');
            var existingUser = await firebase.auth().signInWithEmailAndPassword(email, password);
            var userAuthKey = existingUser['uid'];
            await usersRef.orderByChild('id').equalTo(userAuthKey).once('value').then(function (snapshot) {
                snapshot.forEach(function (userSnapshot) {
                    dispatch(setLoginPending(false));
                    var user = userSnapshot.val();
                    dispatch(setLoginSuccess(user));
                });
            });
        } catch (error) {
            dispatch(setLoginPending(false));
            dispatch(setLoginError(error));
        }
    }
}