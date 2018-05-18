import React from "react";
import {View,Text} from "native-base";
import MapView from "react-native-maps";
import styles from "./mapContainerStyles";
import SearchBox from "../searchBox";

export const MapContainer = ({region})=>{
    return(
        <View style={styles.container}>
            <MapView provider={MapView.PROVIDER_GOOGLE}
                     style={styles.map}
                        region={region} onRegionChange={this.onRegionChange}>
                <Text>{region.latitude}{region.longitude}</Text>
                <MapView.Marker coordinate={region} pinColor="green"/>
            </MapView>
            <SearchBox/>
        </View>
    )
}

export default MapContainer;