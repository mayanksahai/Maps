import React, {Component} from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator, DrawerView} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import OrderDetails from '../screens/OrderDetails';
import OrderItems from '../screens/OrderItems';
import Orders from '../screens/Orders';
import Settings from '../screens/Settings';
import UserDetail from '../screens/UserDetail';
import Me from '../screens/Me';
import Firebase from '../screens/database/Firebase';

import * as css from "../Styles";
import Login from "../screens/gateway/Login";
import SignUp from "../screens/gateway/SignUp";

export const FeedStack = StackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
        },
    },
    Details: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
        }),
    }
});

export const OrderStack = StackNavigator({
    Feed: {
        screen: Orders,
        navigationOptions: {
            title: 'Orders',
        },
    },
    Details: {
        screen: OrderDetails,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.restaurantName.toUpperCase()} ${navigation.state.params.orderDate.toUpperCase()}`,
        }),
    },
    OrderItems:{
        screen: OrderItems,
    }
});


const customComponent= (props) => (
    <ScrollView
        style={{
            flex: 1,
            backgroundColor: css.drawer.style.backgroundColor,
        }}>
        <DrawerView.Items {...props} />
    </ScrollView>
);

export const DrawerNav = DrawerNavigator(
    {
        LoginRoute:{
            screen: Login,
            title: 'Login'
        },
        SignUp:{
            screen: SignUp,
        },
        HomeRoute: {
            screen: FeedStack,
            navigationOptions: {
                    drawerLabel: 'People',
                    drawerIcon: ({tintColor}) => <Icon name="dashboard" color={tintColor}/>,
            },
        },
        OrdersRoute: {
            screen: OrderStack,
            navigationOptions: {
                drawerLabel: 'Current Orders',
                drawerIcon: ({tintColor}) => <Icon name="list" color={tintColor}/>,
            }
        },
        MeRoute: {
            screen: Me,
            navigationOptions: {
                drawerLabel: 'Me',
                drawerIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
            },
        }
    },
    {
        //contentComponent: customComponent,
        drawerPosition: 'left',
        // styling for for DrawerView.Items in contentOptions
        contentOptions: css.drawer
    }
)

export const Tabs = TabNavigator({
    Feed: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
        },
    },
    Orders:{
        screen: OrderStack,
        navigationOptions: {
            tabBarLabel: 'My Orders',
            tabBarIcon: ({ tintColor }) => <Icon name="podcast" size={35} color={tintColor} />,
        },
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel: 'Me',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
    },
});

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings',
        },
    },
});

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
    Settings: {
        screen: SettingsStack,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export default class MainComponent extends Component{

    constructor(props){
        super(props);
        Firebase.initialise();
    }

    render(){
        return (
            <DrawerNav/>
        )
    }
}