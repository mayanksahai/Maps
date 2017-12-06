import * as firebase from 'firebase';

export const FETCH_CHAT_MESSAGES = "'START_FETCHING_MESSAGES'";
export const MESSAGES_FETCHED = "'RECEIVED_MESSAGES'";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const UPDATE_MESSAGE_HEIGHT = "UPDATE_MESSAGE_HIST";

export function addMessage(message){
    return{
        type:ADD_MESSAGE,
        ...message
    };
}

export function sendMessage(text,user) {
    return async dispatch => {
        let msg = {
            text: text,
            time: Date.now(),
            author: {
                name: user.name,
                avatar: user.avatar
            }
        }
        const newMsgRef = await firebase.database()
                                        .ref('messages')
                                        .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    }
}

export function startFetchingMessages(){
    return {
        type: FETCH_CHAT_MESSAGES,
    }
}

export function receivedMessages(){
    return{
        type:MESSAGES_FETCHED,
        receivedOn:Date.now()
    }
}

export function receiveMessages(messages){
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
        dispatch(receivedMessages());
    }
}

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: UPDATE_MESSAGE_HEIGHT,
        height: layout.height
    }
}

export function fetchMessages(){
    return async dispatch => {
        dispatch(startFetchingMessages());
        await firebase.database()
            .ref('messages')
            .orderByKey()
            .limitToLast(20)
            .on('value', (snapshot) => {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const messages = snapshot.val() || [];
                    dispatch(receiveMessages(messages))
                }, 0);
            });
    }
}
