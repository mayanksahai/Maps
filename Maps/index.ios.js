import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet,AppRegistry } from 'react-native';
import MapView from 'react-native-maps';
import Root from "./app/main";

class Maps extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Root {...this.props}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


AppRegistry.registerComponent('Maps', () => Maps);
