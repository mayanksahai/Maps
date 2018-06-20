import update from "react-addons-update";
import constants from "./actionConstants";

import {Dimensions} from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";

const {width,height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
//---------------------------
// Constants
//---------------------------
const {GET_CURRENT_LOCATION,GET_INPUT,SELECTED_SEARCH_TAB,GET_ADDRESS_SUGGESTIONS,
        GET_SELECTED_ADDRESS, GET_DISTANCE_MATRIX, GET_FARE, BOOK_CAR, GET_NEAR_BY_DRIVERS, BOOKING_CONFIRMED} = constants;

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
            (error)=>console.log("fetch location issue::" + error.message),
            {enableHighAccuracy:true,timeout:2000,maximumAge:1000}
        )
    }
}

export function getInputData(payload){
    return {
        type: GET_INPUT,
        payload
    }
}


export function selectedSearchTab(payload){
    return {
        type: SELECTED_SEARCH_TAB,
        payload
    }
}

//Get address from google places
export function getAddressSuggestions(){
    return(dispatch,store) => {
        let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput,{
            country:"SG"
        }).then(
            (results)=>{
                dispatch({
                    type:GET_ADDRESS_SUGGESTIONS,
                    payload:results
                })
            }
        ).catch((error)=>console.log(error.message));
    };
}

// get selected address
export function getSelectedAddress(payload){
    const dummyNumbers = {
        baseFare:0.4,
        timeRate:0.14,
        distanceRate:0.97,
        surge:1
    }
    return(dispatch,store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
            .then((results) =>{
                    dispatch({
                        type:GET_SELECTED_ADDRESS,
                        payload:results
                    })
            }).then(()=>{
                if(store().home.selectedAddress.selectedPickUp || store().home.selectedAddress.selectedDropOff){
                    request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                        .query({
                            origins:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
                            destinations:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
                            mode:"driving",
                            key:"AIzaSyBZk9GATQTYpQIrUt57erHY9iQATQt5LwQ",
                        }).finish((error,res) => {
                            dispatch({
                                    type:GET_DISTANCE_MATRIX,
                                    payload:res.body
                                })
                        })
                }
                setTimeout(function(){
                    if(store().home.selectedAddress.selectedPickUp || store().home.selectedAddress.selectedDropOff){
                        const fare = calculateFare(
                            dummyNumbers.baseFare,dummyNumbers.timeRate,
                            store().home.distanceMatrix.rows[0].elements[0].duration.value,
                            dummyNumbers.distanceRate,
                            store().home.distanceMatrix.rows[0].elements[0].distance.value,
                            dummyNumbers.surge
                        );
                        dispatch({
                            type:GET_FARE,
                            payload:fare
                        })
                    }
            },1000)
            })
            .catch((error)=> console.log(error.message));
    }
}

//boook car

export function bookCar(){
    return((dispatch,store) => {
        const nearByDrivers = store().home.nearByDrivers;
        const nearByDriver = nearByDrivers[1];
        const payload = {
            data:{
                username:"mayank",
                pickUp:{
                    address:store().home.selectedAddress.selectedPickUp.address,
                    name:store().home.selectedAddress.selectedPickUp.name,
                    latitude:store().home.selectedAddress.selectedPickUp.latitude,
                    longitude:store().home.selectedAddress.selectedPickUp.longitude,
                },
                dropOff:{
                    address:store().home.selectedAddress.selectedDropOff.address,
                    name:store().home.selectedAddress.selectedDropOff.name,
                    latitude:store().home.selectedAddress.selectedDropOff.latitude,
                    longitude:store().home.selectedAddress.selectedDropOff.longitude,
                },
                fare:store().home.fare,
                status:"pending"
            },
            nearByDriver:{
                socketId:nearByDriver.socketId,
                driverId:nearByDriver.driverId,
                latitude:nearByDriver.coordinate.coordinates[1],
                longitude:nearByDriver.coordinate.coordinates[0]
            }
        };

        request.post("http://localhost:3000/api/bookings")
            .send(payload)
            .finish((error, res)=>{
                dispatch({
                    type:BOOK_CAR,
                    payload:res.body
                });
            });

    })

}


//get nearby drivers
export function getNearByDrivers(){
    return(dispatch,store) => {
        request.get("http://localhost:3000/api/driverLocation")
            .query({
                latitude:store().home.region.latitude,
                longitude:store().home.region.longitude
            })
            .finish((error,response)=>{
                dispatch({
                    type:GET_NEAR_BY_DRIVERS,
                    payload:response.body
                })
            });
    };
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

function handleGetInputData(state,action){
   const{key,value} = action.payload;
   return(update(state,{
            inputData:{
                [key]:{
                    $set:value
                }
            }
       }
   ));
}

function handleSelectedSearchTab(state,action){
    if(action.payload == "pickUp"){
        return(update(state,{
            resultTypes:{
                pickUp: {
                    $set:true
                },
                dropOff:{
                    $set:false
                }
            },
            predictions:{
                $set:{}
            }
        }));
    }
    if(action.payload == "dropOff"){
        return(update(state,{
            resultTypes:{
                pickUp: {
                    $set:false
                },
                dropOff:{
                    $set:true
                }
            },
            predictions:{
                $set:{}
            }
        }));
    }
}

function handleAddressSuggestions(state,action){
    return update(state,{
        predictions:{
            $set:action.payload
        }
    })
}

function handleGetSelectedAddress(state,action){
    let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
    return update(state,{
        selectedAddress:{
            [selectedTitle]: {
                $set: action.payload
            }
        },
        resultTypes:{
            pickUp:{
                $set:false
            },
            dropOff:{
                $set:false
            }
        }
    })
}

function handleGetDistanceMatrix(state,action){
    return update(state,{
            distanceMatrix:{
                $set:action.payload
            }
        }
    )
}

function handleGetFare(state,action){
    return update(state,{
            fare:{
                $set:action.payload
            }
        }
    )
}

function handleBookCar(state,action){
    return update(state,{
        booking:{
            $set:action.payload
        }
    })
}

function handleGetNearByDrivers(state,action){
    return update(state,{
        nearByDrivers:{
            $set:action.payload
        }
    })
}

function handleBookingConfirmed(state, action){
    return update(state, {
        booking:{
            $set: action.payload
        }
    });

}

const initialState = {
    region:{},
    inputData:{},
    resultTypes:{},
    selectedAddress:{},
    distanceMatrix:{}
};

const ACTION_HANDLERS= {
    GET_CURRENT_LOCATION:handleGetCurrentLocation,
    GET_INPUT:handleGetInputData,
    SELECTED_SEARCH_TAB:handleSelectedSearchTab,
    GET_ADDRESS_SUGGESTIONS:handleAddressSuggestions,
    GET_SELECTED_ADDRESS:handleGetSelectedAddress,
    GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
    GET_FARE:handleGetFare,
    BOOK_CAR:handleBookCar,
    GET_NEAR_BY_DRIVERS:handleGetNearByDrivers,
    BOOKING_CONFIRMED:handleBookingConfirmed
};

export function HomeReducer(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state,action) : state;
}