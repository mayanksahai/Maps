import React from "react";
import {Text} from "react-native";
import styles from "./searchResultsStyles";
import {View,List,ListItem,Left,Body} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {getSelectedAddress} from "../../modules/home";

export const SearchResults = ({predictions, getSelectedAddress})=> {

    function handleSelectedAddress(placeId){
        getSelectedAddress(placeId)
    }

    return(
        <View style={styles.searchResultsWrapper} >
            <List
                dataArray={predictions}
                renderRow={(item)=>
                    <View>
                        <ListItem onPress={() => handleSelectedAddress(item.placeID)} button avatar>
                            <Left style={styles.leftContainer}>
                                <Icon style={styles.leftIcon} name="map-marker" />
                            </Left>
                            <Body>
                            <Text style={styles.primaryText}>{item.primaryText}</Text>
                            <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                            </Body>
                        </ListItem>
                    </View>
                }
            />
        </View>

    );
};

export default SearchResults;