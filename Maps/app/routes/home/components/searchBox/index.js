import React from "react";
import {Text} from "react-native";
import styles from "./searchBoxStyles";
import {View,InputGroup,Input} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

export const SearchBox = () => {
    return(
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PickUp</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A"/>
                    <Input style={styles.inputSearch} placeholder="choose pickup location"/>
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DropOff</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A"/>
                    <Input style={styles.inputSearch} placeholder="choose drop off location"/>
                </InputGroup>
            </View>
        </View>
    );
};

export default SearchBox;