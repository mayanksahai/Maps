import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, ActivityIndicator} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Image
} from "native-base";

import RestaurantHome from '../restaurant/RestaurantHome';
import SupplierHome from "../supplier/SupplierHome";

export default class SideBar extends Component{

    constructor(props){
        super(props);
        this.state={
            loggedInUserRole: props.loggedInUserRole
        };
    }

    render(){
        const state = this.props.navigation.state
        const loggedInUser = state.params.role;
        return(

                    loggedInUser == 'restaurant'
                        ? <RestaurantNavigator/>
                        : <SupplierNavigator/>


        );
    }

}

