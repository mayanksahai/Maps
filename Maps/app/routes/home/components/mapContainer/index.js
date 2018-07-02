import React from "react";
import {View} from "native-base";
import MapView from "react-native-maps";
import styles from "./mapContainerStyles";
import SearchBox from "../searchBox";
import SearchResults from "../searchResults";

export const MapContainer = ({region, getInputData, selectedSearchTab, getAddressSuggestions, resultTypes,
                                 predictions, getSelectedAddress, selectedAddress, carMarker, nearByDrivers})=>{

    const {selectedPickUp,selectedDropOff} = selectedAddress || {};

    return(

        <View style={styles.container}>
            <MapView provider={MapView.PROVIDER_GOOGLE}
                     style={styles.map}
                        region={region} onRegionChange={this.onRegionChange}>

                {selectedPickUp &&
                    <MapView.Marker coordinate={{latitude:selectedPickUp.latitude,longitude:selectedPickUp.longitude}} pinColor="green"/>
                }
                {selectedDropOff &&
                    <MapView.Marker coordinate={{latitude:selectedDropOff.latitude,longitude:selectedDropOff.longitude}} pinColor="red"/>
                }

                {
                    nearByDrivers && nearByDrivers.map((marker, index)=>
                        <MapView.Marker
                            key={index}
                            coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
                            image={carMarker}
                        />
                    )
                }
            </MapView>
            <SearchBox getInputData={getInputData}
                       selectedSearchTab={selectedSearchTab}
                       getAddressSuggestions={getAddressSuggestions}
                       selectedAddress={selectedAddress}
            />
            { (resultTypes.pickUp || resultTypes.dropOff) &&
            <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
            }
        </View>
    )
}

export default MapContainer;