import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

import createSocketIoMiddleWare from "redux-socket.io";
import io from "socket.io-client/dist/socket.io";

let socket = io("http://localhost:3000",{jsonp:false});
let socketIoMiddleware = createSocketIoMiddleWare(socket,"server/");

const log = createLogger({diff:true,collapsed:true});

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middleware = [thunk,log, socketIoMiddleware];

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

export default (initialState={}) => {

    const store = createStore(
                        makeRootReducer(),
                                initialState,
                                enhancer
    );

    return store;

};