import React from "react";
import styles  from "./acceptBookingStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { List, ListItem,Button, View, Header, Card, CardItem, Thumbnail, Text, Left, Right,Body} from 'native-base';

export const AcceptBooking = ({pendingBookings,acceptBooking,rejectBooking})=>{
    

    return(
        <View style={styles.pendingBookingsContainer} >
            <List
                dataArray={pendingBookings}
                renderRow={(item)=>
                    <View style={styles.itemRow}>
                        <ListItem itemDivider style={{backgroundColor: '#D6DBDF'}}>
                            <Left>
                                <Icon style={styles.leftIcon} name="suitcase"/>
                                <Body>
                                    <Text style={styles.primaryText}>{item.pickUp.name}</Text>
                                    <Icon style={styles.leftIcon} name="arrow-circle-right"/>
                                    <Text style={styles.secondaryText}>{item.dropOff.name}</Text>
                                    <Text style={styles.fareText}>{item.fare} S$</Text>
                                </Body>
                            </Left>

                            <Button rounded primary small onPress={() => acceptBooking(item._id)}>
                                <Text>Accept</Text>
                            </Button>
                            <Button rounded danger small onPress={() => rejectBooking(item._id)}>
                                <Text>Reject</Text>
                            </Button>
                        </ListItem>
                    </View>
                }
            />
        </View>

    );
}

export default AcceptBooking;
