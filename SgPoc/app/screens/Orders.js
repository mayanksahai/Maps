import React , {Component} from 'react';
import {
    Text,View, ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { orders } from '../config/restaurantData';

class Orders extends Component{

    constructor(props){
        super(props);
    }

    onLearnMore = (order) => {
        this.props.navigation.navigate('Details', { ...order });
    };

    render(){
        return(
            <ScrollView>
                <List>
                    {orders.map((order) => (
                        <ListItem
                            key={order.id}
                            roundAvatar
                            title={`${order.restaurantName.toUpperCase()} ${order.orderDate.toUpperCase()}`}
                            subtitle={order.totalValue}
                            onPress={() => this.onLearnMore(order)}
                        />
                    ))}
                </List>
            </ScrollView>
        );
    }
}

export default Orders;