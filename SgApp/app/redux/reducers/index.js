import { combineReducers } from 'redux';
import { loggedInUser } from './login';
import  chatroom from './chatroom';
import {messages} from './chatMessages';
import { fetchVenuesFromFourSquare } from "../actions/Foursquare";

const rootReducer = combineReducers({
    loggedInUser,chatroom
});

export default rootReducer;