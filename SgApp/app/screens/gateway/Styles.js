import React, {StyleSheet} from 'react-native';

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'stretch'
        },
        body: {
            flex: 9,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: '#F5FCFF',
        },
        primaryButton: {
            margin: 10,
            padding: 15,
            alignSelf:'center',
            backgroundColor:"blue",
            width:150
        },
    }
);