import update from "react-addons-update";
import constants from "./actionConstants";

import { Dimensions } from "react-native"
import RNGooglePlaces from "react-native-google-places";


//--------------------
//Constants
//--------------------
const {
    LOGIN_CREDENTIAL
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA



//--------------------
//Actions
//--------------------
export function setLoginCredential(payload){
    return {
        type: LOGIN_CREDENTIAL,
        payload
    }
}


const ACTION_HANDLERS = {
}

const initialState = {
    loggedIn:false
};

export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}