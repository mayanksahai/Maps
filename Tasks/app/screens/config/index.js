import React from 'react-native';
import {TabNavigator, NavigationComponent} from 'react-navigation';
import {Icon} from 'react-native-elements';

import ClientOrdersList from '../restaurant/ClientOrdersList';
import ModifyClientOrder from '../restaurant/ModifyClientOrder';

export const Tabs= TabNavigator({
  MyOrders: {
      screen: ClientOrdersList,
      navigationOptions: {
         tabBarLabel: 'MyOrders',
         tabBarIcon: ({ tintColor }) => <Icon name="ios-list-box-outline" size={28} color={tintColor} />,
      },
  },
  UpdateOrder: {
    screen: ModifyClientOrder,
    navigationOptions: {
       tabBarLabel: 'UpdateOrder',
       tabBarIcon: ({ tintColor }) => <Icon name="ios-pulse-outline" size={28} color={tintColor} />,
      },
  },
},
  
{
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
  bottomNavigationOptions: {
                                labelColor: 'black',
                                rippleColor: 'white',
                                        tabs: {
                                                      MyOrders: {
                                                        barBackgroundColor: '#44a2f0',
                                                        activeLabelColor: 'white',
                                                        activeIcon: <Icon size={35} color="#FFFFFF" name="ios-list-box-outline" />

                                                      },
                                                      UpdateOrder: {
                                                        barBackgroundColor: '#44a2f0',
                                                        activeLabelColor: 'white',
                                                        activeIcon: <Icon size={35} color="#FFFFFF" name="ios-pulse-outline" />

                                                      }
                                              }
                              }

                },
});