import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Button,
    Text,
    Container,
    TouchableOpacity,
    List,
    ListItem,
    Content,
    Image
} from "native-base";
import Login from '../gateway/Login'
import SignUp from '../gateway/SignUp'
import SideBar from './SideBar'
import SupplierHome  from '../supplier/SupplierHome'
import RestaurantHome  from '../restaurant/RestaurantHome'
import DrawerButton from './DrawerButton';
import MyLocationMapMarker from './SearchRestaurant';
import AnimatedMapView from './AnimatedMapView';
import ShoppingCartButton from './ShoppingCart';
import HomeViewTitle from './HomeViewTitle';
import Recommendations from '../recommendations/Recommendations';
import SearchOrdersButton from "./SearchOrdersButton";
import ChatUi from "../chat/chatUi";

export const LoggedOut = StackNavigator(
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
        headerMode: 'float',
        navigationOptions: {
            headerStyle: {backgroundColor: 'red'},
            title: 'You are not logged in'
        }
    }
);

export const SupplierNavBar = DrawerNavigator(
    {
        SupplierHome: {
            screen: SupplierHome,
            navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon: ({tintColor}) => <Icon name="dashboard" color={tintColor}/>,
            },
        },
        SupplierSearch:{
            screen: Recommendations,
            navigationOptions: {
                drawerLabel: 'Restaurant Search',
                drawerIcon: ({tintColor}) => <Icon name="search" color={tintColor}/>,
            }
        },
        Chatroom:{
            screen:ChatUi,
            navigationOptions: {
                drawerLabel: 'ChatRoom',
                drawerIcon: ({tintColor}) => <Icon name="search" color={tintColor}/>,
            }
        }
    },
)

export const RestaurantNavBar = DrawerNavigator(
    {
        RestaurantHome: {
            screen: RestaurantHome,
            navigationOptions: {
                drawerLabel: 'People',
                drawerIcon: ({tintColor}) => <Icon name="dashboard" color={tintColor}/>,
            },
        },
    },
)


const SupplierStack = StackNavigator({
    SideBar: { screen: SupplierNavBar }
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: 'green'},
        title: 'welcome '+ navigation.state.params.loggedInUser.fullName,
        headerLeft:  <DrawerButton navigation={navigation}/>,
        headerRight: <ShoppingCartButton search={() => console.log("testing")}/>
        }),

})


const RestaurantStack = StackNavigator({
    SideBar: { screen: RestaurantNavBar }
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: 'green'},
        title: 'Logged In to your app!',
        headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
    })
})


// Manifest of possible screens
const PrimaryNav = StackNavigator({
    LoggedOutStack: { screen: LoggedOut },
    SupplierStack: { screen: SupplierStack },
    RestaurantStack: { screen: RestaurantStack }
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'LoggedOutStack'
})

export default PrimaryNav