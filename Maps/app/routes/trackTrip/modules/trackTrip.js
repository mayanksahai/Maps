import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
const {width,height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

const {
    GET_DISTANCE_FROM_CUSTOMER,
    GET_DRIVER_LATEST_LOCATION,
    GET_CURRENT_BOOKING
} = constants;

export function getDriverLatestLocation(){
    return(dispatch,store)=>{
       dispatch({
           type:GET_DRIVER_LATEST_LOCATION,
           payload:store().bookingInfo.driverLocation
       });
    }
}

export function getCurrentBooking(){
    return(dispatch,store)=>{
       dispatch({
           type:GET_CURRENT_BOOKING,
           payload:store().bookingInfo.activeBooking
       });
    }
}

//get distance from driver
export function getDistanceFromCustomer(){
    return (dispatch, store)=>{
        if(store().bookingInfo.driverLocation){
            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                .query({
                    origins:store().bookingInfo.activeBooking.pickUp.latitude +
                    "," + store().bookingInfo.activeBooking.pickUp.longitude,
                    destinations:store().bookingInfo.driverLocation.latitude +
                    "," + store().bookingInfo.driverLocation.longitude,
                    mode:"driving",
                    key:"AIzaSyBZk9GATQTYpQIrUt57erHY9iQATQt5LwQ"
                })
                .finish((error, res)=>{
                    dispatch({
                        type:GET_DISTANCE_FROM_CUSTOMER,
                        payload:res.body
                    })
                });

        }
    }
}


function handleGetDistanceFromCustomer(state, action){
    return update(state, {
        distanceFromCustomer:{
            $set:action.payload
        }
    });
}

function handleGetDistanceFromDestination(state, action){
    return update(state, {
        distanceFromDestination:{
            $set:action.payload
        }
    });
}

function handleGetDriverLatestLocation(state, action){
    return update(state, {
        currentLocation:{
            latitude:{
                $set:action.payload.latitude
            },
            longitude:{
                $set:action.payload.longitude
            },
            latitudeDelta:{
                $set:LATITUDE_DELTA
            },
            longitudeDelta:{
                $set:LONGITUDE_DELTA
            }
        }
    });
}

function handleGetCurrentBooking(state, action){
    return update(state, {
        currentBooking:{
            $set:action.payload
        }
    });
}

const ACTION_HANDLERS = {
    GET_DISTANCE_FROM_CUSTOMER:handleGetDistanceFromCustomer,
    GET_DISTANCE_FROM_DESTINATION:handleGetDistanceFromDestination,
    GET_DRIVER_LATEST_LOCATION:handleGetDriverLatestLocation,
    GET_CURRENT_BOOKING:handleGetCurrentBooking
}

const initialState = {
    currentLocation:{},
    currentBooking:{}
};

export function TrackTripReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}