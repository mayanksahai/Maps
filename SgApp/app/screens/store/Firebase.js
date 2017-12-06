import * as firebase from "firebase";


class Firebase {

    // apiKey: "AIzaSyDeU879o-8qVHd-vq8tK6tP6UNXliyRqfw",
    // authDomain: "sgpoc-a0613.firebaseapp.com",
    // databaseURL: "https://sgpoc-a0613.firebaseio.com",
    // projectId: "sgpoc-a0613",
    // storageBucket: "sgpoc-a0613.appspot.com",
    // messagingSenderId: "613877745550"

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyDeU879o-8qVHd-vq8tK6tP6UNXliyRqfw",
            authDomain: "sgpoc-a0613.firebaseapp.com",
            databaseURL: "https://sgpoc-a0613.firebaseio.com",
            storageBucket: "sgpoc-a0613.appspot.com"
        });
    }

}

module.exports = Firebase;