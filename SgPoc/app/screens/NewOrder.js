import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class OrderDetails extends Component {

    showItems= (items) => {
        this.props.navigation.navigate('OrderItems', { ...items });
    };

    render() {
        const {orderDate, deliveryDate, restaurantName, supplierName, items, totalValue, currency, uri } = this.props.navigation.state.params;

        return (
            <ScrollView>
                <Tile
                    imageSrc={{ uri: uri}}
                    featured
                    title={`${supplierName.toUpperCase()}`}
                    caption={restaurantName}
                />

                <List>
                    <ListItem
                        title="OrderDate"
                        rightTitle={orderDate}
                        hideChevron
                    />
                    <ListItem
                        title="Restaurant Name"
                        rightTitle={restaurantName}
                        hideChevron
                    />
                    <ListItem
                        title="DeliveryDate"
                        rightTitle={deliveryDate}
                        hideChevron
                    />
                </List>

                <List>
                    <ListItem title="Total Items" rightTitle={items.length} hideChevron
                              onLongPress={() => this.showItems(items)}>

                    </ListItem>
                </List>

                <List>
                    <ListItem
                        title="TotalCost"
                        rightTitle={totalValue}
                        hideChevron
                    />
                    <ListItem
                        title="Currency"
                        rightTitle={currency}
                        hideChevron
                    />
                </List>
            </ScrollView>
        );
    }
}

export default OrderDetails;