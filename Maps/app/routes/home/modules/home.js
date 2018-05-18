import update from "react-addons-update";
import constants from "./actionConstants";

import {Dimensions} from "react-native";
const {width,height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
//---------------------------
// Constants
//---------------------------
const {GET_CURRENT_LOCATION} = constants;

//---------------------------
// Actions
//---------------------------
export function getCurrentLocation(){
    return (dispatch)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                dispatch({
                    type:GET_CURRENT_LOCATION,
                    payload:position
                });
            },
            (error)=>console.log(error.message),
            {enableHighAccuracy:true,timeout:2000,maximumAge:1000}
        )
    }
}

//---------------------------
// ActionHandlers
//---------------------------

function handleGetCurrentLocation(state,action){
    return(update(state,{
        region:{
            latitude:{
                $set:action.payload.coords.latitude
            },
            longitude:{
                $set:action.payload.coords.longitude
            },
            latitudeDelta:{
                $set:LATITUDE_DELTA
            },
            longitudeDelta:{
                $set:LONGITUDE_DELTA
            }
        }
    }))
}

const initialState = {
    region:{}
};

const ACTION_HANDLERS= {
    GET_CURRENT_LOCATION:handleGetCurrentLocation
};

export function HomeReducer(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state,action) : state;
}