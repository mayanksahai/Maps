import React from "react";
import {View, Text} from "react-native";

import { Container }  from "native-base";
import HeaderComponent from "../../../components/headerComponent";
import MapTrip from "./mapTrip";
const carMarker = require("../../../assets/images/carMarker.png");

class TrackTrip extends React.Component{

    componentDidMount() {
        this.props.getDriverLatestLocation();
        this.props.getCurrentBooking();
    }

    

    render(){
        return(
            <Container>
                <View style={{flex:1}}>
                    {
                        this.props.currentLocation.latitude &&
                        <MapTrip
                            region={this.props.currentLocation}
                            currentBooking={this.props.currentBooking}
                            driverLocation={this.props.currentLocation}
                            showCarMaker={true}
                            carMarker={carMarker}
                        />
                    }
                </View>
            </Container>

        );

    }
}

export default TrackTrip;