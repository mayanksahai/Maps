import update from "react-addons-update";
import constants from "./actionConstants";
import request from "../../../util/request";

const {
    GET_PENDING_BOOKINGS,
    DRIVER_REJECTED_BOOKING,
    DRIVER_ACCEPTED_BOOKING
} = constants;

//--------------------
//Actions
//--------------------
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
    return (dispatch) => {
        var dbBookings = this.state.pendingBookings;
        dbBookings = dbBookings.filter(function(item){
            return item.id == bookingId;
        })
        dispatch({
            type:DRIVER_ACCEPTED_BOOKING,
            payload:dbBookings
        });
    }
}


function handleGetPendingBookings(state, action){
    return update(state, {
        pendingBookings:{
            $set:action.payload
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
    return update(state, {
        pendingBookings:{
            $set:action.payload
        }
    });
}

const ACTION_HANDLERS = {
    GET_PENDING_BOOKINGS:handleGetPendingBookings,
    DRIVER_ACCEPTED_BOOKING:handleDriverAcceptedBooking,
    DRIVER_REJECTED_BOOKING:handleDriverRejectedBooking,
}

const initialState = {
    availableDrivers:{},
    pendingBookings:[]
};

export function BookingInfoReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}