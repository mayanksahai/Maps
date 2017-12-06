import React , { Component } from 'react'
import MapView from 'react-native-maps';
import {View, ActivityIndicator, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StyleSheet,Dimensions,TouchableOpacity} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
export default class AnimatedMapView extends  Component{

    constructor(props){
        super(props);
        this.state = {
            mapRegion: new MapView.AnimatedRegion({
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            }),
        }
        this.watchID = null
    }

    componentWillMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }

            this.onRegionChange(region);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region) {
        console.log("latest" + region);
        this.setState({
            mapRegion: region
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <MapView.Animated style={ styles.map }
                         showsUserLocation = {true}
                         followUserLocation = {true}
                         showsMyLocationButton = {true}
                         zoomEnabled = {true}
                         region={this.state.mapRegion}
                         onRegionChange={this.onRegionChange.bind(this)} >
                    <MapView.Marker.Animated
                        title="This is a title"
                        description="This is a description"
                        coordinate={this.state.mapRegion}
                    />
                </MapView.Animated>
            </View>
        );
    }
}