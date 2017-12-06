import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import { connect } from 'react-redux';


class HomeViewTitle extends Component {

    render() {

        return (

            <View style={{height: 64, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', paddingTop: 20}}>
                <Text style={{color: '#FFFFFF', fontSize: 17, fontWeight: 'bold'}}>Home</Text>
            </View>

        );

    }

}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(HomeViewTitle);