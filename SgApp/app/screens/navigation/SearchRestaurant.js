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
export default class LocationMap extends  Component{

    constructor(props){
        super(props);
        this.state = {
            mapRegion: null,
            lastLat: 37.78825,
            lastLong: -122.4324,
            latitudeDelta:  0.5,
            longitudeDelta: 0.5,
            statusBarHeight: 0,
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
            mapRegion: region,
            lastLat: region.latitude || this.state.lastLat,
            lastLong: region.longitude || this.state.lastLong
        });
    }

    onPressZoomIn() {
        region = {
            latitude:       this.state.lastLat,
            longitude:      this.state.lastLong,
            ltDelta:        this.state.latitudeDelta * 10,
            lgDelta:        this.state.longitudeDelta * 10
        }
        this.setState={
            latitudeDelta:  region.ltDelta,
            longitudeDelta: region.lgDelta,
            lastLat: region.latitude,
            lastLong: region.longitude
        }
    }

    onPressZoomOut() {
        region = {
            latitude:       this.state.lastLat,
            longitude:      this.state.lastLong,
            ltDelta:        this.state.latitudeDelta / 10,
            lgDelta:        this.state.longitudeDelta / 10
        }
        this.setState={
            latitudeDelta:  region.ltDelta,
            longitudeDelta: region.lgDelta,
            lastLat: region.latitude,
            lastLong: region.longitude
        }
        console.log('lt : ' + region.ltDelta + ' lg : ' + region.lgDelta)
    }

    render(){
        return (
            <View style={styles.container}>
                <MapView style={ styles.map }
                         showsUserLocation = {true}
                         followUserLocation = {true}
                         showsMyLocationButton = {true}
                         zoomEnabled = {true}
                         region={this.state.mapRegion}
                         onRegionChange={this.onRegionChange.bind(this)} >
                    <MapView.Marker
                        title="This is a title"
                        description="This is a description"
                        coordinate={{latitude:this.state.lastLat,longitude:this.state.lastLong}}
                    />
                </MapView>
            </View>
        );
    }
}