import React, {Component} from 'react';
import Login from '../gateway/Login';
import SignUp from '../gateway/SignUp';
import SideBar from './SideBar';
import { StackNavigator,} from 'react-navigation';

export const SignedOut = StackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login',
            },
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                title: 'SignUp',
            },
        },
        SideBar:{
            screen: SideBar,
            navigationOptions: {

            },
        }
    },
    {
        headerMode: 'screen'
    }
);