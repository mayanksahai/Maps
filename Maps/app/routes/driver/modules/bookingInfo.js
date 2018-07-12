import update from "react-addons-update";
import constants from "./actionConstants";
import request from "../../../util/request";
import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

const {
    MY_CURRENT_LOCATION,
    GET_PENDING_BOOKINGS,
    DRIVER_REJECTED_BOOKING,
    DRIVER_ACCEPTED_BOOKING,
    DRIVER_REGISTERED
} = constants;

//--------------------
//Actions
//--------------------

export function getDriverCurrentLocation(){
    return(dispatch)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                dispatch({
                    type:MY_CURRENT_LOCATION,
                    payload:position
                });
            },
            (error)=> console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
        );
    }
}



export function registerMe(payload){
    return ((dispatch)=>{
        request.post("http://localhost:3000/api/driverLocations")
        .send(payload)
        .finish((error, res)=>{
            console.log("driver registered: " + res);
            dispatch({
                type:DRIVER_REGISTERED,
                payload:true
            });
        });
    })
}

export function getPendingBookings(){
    return (dispatch)=>{
        request.get("http://localhost:3000/api/pendingBookings")
            .finish((error, res)=>{
                dispatch({
                    type:GET_PENDING_BOOKINGS,
                    payload:res.body
                });
            });
    }
}

export function rejectBooking(bookingId){
    return (dispatch,store) => {
        var dbBookings = store().bookingInfo.pendingBookings;
        dbBookings = dbBookings.filter(function(item){
            return item._id != bookingId;
        })
        dispatch({
            type:DRIVER_REJECTED_BOOKING,
            payload:dbBookings
        });
    }
}

export function acceptBooking(bookingId){
    return ((dispatch,store)=>{
        var payload = {
            "status": "confirmed",
            "driverId":store().bookingInfo.driverId,
            "bookingId":bookingId
        };
        request.put("http://localhost:3000/api/bookings/"+payload.bookingId)
        .send(payload)
        .finish((error, res)=>{
            console.log("driver accepted booking: " + res.body);
            dispatch({
                type:DRIVER_ACCEPTED_BOOKING,
                payload:res.body
            });
        });
    })
}


function handleGetPendingBookings(state, action){
    return update(state, {
        pendingBookings:{
            $set:action.payload
        }
    });
}

function handleMyCurrentLocation(state, action){
    return update(state, {
        driverLocation:{
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
    });
}

function handleDriverRejectedBooking(state, action){
    return update(state, {
        pendingBookings:{
            $set:action.payload
        }
    });
}

function handleDriverAcceptedBooking(state, action){
    //update booking object in databse with driver socketId
    return update(state, {
        activeBooking:{
            $set:action.payload
        }
    });
}

function handleDriverRegistered(state, action){
    //update booking object in databse with driver socketId
    return update(state, {
        driverRegistered:{
            $set:action.payload
        }
    });
}



const ACTION_HANDLERS = {
    GET_PENDING_BOOKINGS:handleGetPendingBookings,
    MY_CURRENT_LOCATION:handleMyCurrentLocation,
    DRIVER_ACCEPTED_BOOKING:handleDriverAcceptedBooking,
    DRIVER_REJECTED_BOOKING:handleDriverRejectedBooking,
    DRIVER_REGISTERED:handleDriverRegistered
}

const initialState = {
    driverLocation:{},
    availableDrivers:{},
    driverId:"5b0b5d4e60b4262c244bed22",
    pendingBookings:[],
    driverRegistered:false,
    activeBooking:{}
};

export function BookingInfoReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}