import * as firebase from "firebase";
import React, {Component} from 'react';

class Database{

    static addUserDetails(id,details){

        let usersPath = "/Users";
        firebase.database().ref(usersPath).child(this.state.companyName).set({
            id: id,
            email: details.email,
            fullName: details.companyName,
            mobile: details.mobile,
            role: details.role,
            pinCode: details.pinCode,
            country: details.country
        });
    }

    static listenUserMobile(userId, callback) {

        let userMobilePath = "/user/" + userId + "/details";

        firebase.database().ref(userMobilePath).on('value', (snapshot) => {

            var mobile = "";

            if (snapshot.val()) {
                mobile = snapshot.val().mobile
            }

            callback(mobile)
        });
    }

}

module.exports = Database;