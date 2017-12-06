
import { combineReducers } from 'redux';
import {messages} from "./chatMessages";
import {FETCH_CHAT_MESSAGES,UPDATE_MESSAGE_HEIGHT,MESSAGES_FETCHED} from '../actions/chatroom';

const initialState = {
    isFetching: false,
    lastFetched: null,
    height: 0
}

export function meta(state = initialState, action){
    switch (action.type) {
        case FETCH_CHAT_MESSAGES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case MESSAGES_FETCHED:
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt
            });
        case UPDATE_MESSAGE_HEIGHT:
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state
    }
}

const chatroom = combineReducers({
    messages,
    meta
});

export default chatroom;
