import React from "react";
import {Text} from "react-native";
import {View,Button} from "native-base";
import styles  from "./findDriverStyles";
import Icon from "react-native-vector-icons/FontAwesome";

var Spinner = require('react-native-spinkit');

export const FindDriver = ({selectedAddress})=>{

    const {selectedPickUp,selectedDropOff} = selectedAddress || {}
    return (

        <View style={styles.findDriverContainer}>

            <Spinner style={styles.spinner} isVisible size={150} type="Pulse" color="#ffffff"/>

            <View style={styles.content}>
                <Text style={styles.text}> Processing your request </Text>
                <Icon style={styles.locationIcon} name="map-marker"/>

                <View style={styles.pickUp}>
                    <Text>{selectedPickUp.name}</Text>
                </View>

                <Icon style={styles.toArrow} name="long-arrow-down"/>
                <View style={styles.dropOff}>
                    <Text>{selectedDropOff.name}</Text>
                </View>

                <View>
                    <Text style={styles.termsText}>By booking you confirm our T & C</Text>
                    <Button style={styles.cancelBtn}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </Button>
                </View>
            </View>
        </View>

    );
}

export default FindDriver;
