import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class OrderItems extends Component {
    render() {
        const items = this.props.navigation.state.params;
        console.log(items);
        return (
            <ScrollView>
                <List>
                    <ListItem
                        title="Fish"
                        rightTitle={100}
                        hideChevron
                    />
                    <ListItem
                        title="Beer"
                        rightTitle={200}
                        hideChevron
                    />
                </List>
            </ScrollView>
        );
    }
}

export default OrderItems;