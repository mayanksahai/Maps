import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";

import styles from "./MapTripStyles.js";

const EDGE_PADDING = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
  }

export const MapTrip = ({
                             region,
                             driverLocation,
                             showCarMaker,
                             currentBooking,
                             carMarker
                         })=>{
                             

    return(
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                ref={(ref) => { this.mapRef = ref }}
                onLayout = {() => this.mapRef.fitToCoordinates([{latitude: parseFloat(currentBooking.pickUp.latitude),longitude: parseFloat(currentBooking.pickUp.longitude)}, {latitude: parseFloat(currentBooking.dropOff.latitude), longitude: parseFloat(currentBooking.dropOff.longitude) }], { edgePadding:EDGE_PADDING, animated: false })}

            >

                { currentBooking.pickUp &&
                <MapView.Marker
                    coordinate={{latitude:parseFloat(currentBooking.pickUp.latitude), longitude:parseFloat(currentBooking.pickUp.longitude)}}
                    pinColor="green"

                />
                }
                { currentBooking.dropOff &&
                <MapView.Marker
                    coordinate={{latitude:parseFloat(currentBooking.dropOff.latitude), longitude:parseFloat(currentBooking.dropOff.longitude)}}
                    pinColor="blue"

                />
                }
                { showCarMaker && driverLocation &&
                <MapView.Marker
                    coordinate={{latitude:driverLocation.latitude, longitude:driverLocation.longitude}}
                    image={carMarker}

                />
                }


            </MapView>
        </View>
    )
}

export default MapTrip;