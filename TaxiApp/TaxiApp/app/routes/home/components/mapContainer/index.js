import React from "react";
import {View} from "native-base";
import MapView from "react-native-maps";
import styles from "./mapContainerStyles";

export const MapContainer = ({region})=>{
    return(
        <View style={styles.container}>
            <MapView provider={MapView.PROVIDER_GOOGLE}
                     style={styles.map}
                        region={region}>

            </MapView>
        </View>
    )
}

export default MapContainer;