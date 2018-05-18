import React from "react";
import {Text} from "react-native";
import styles from "./searchBoxStyles";
import {View,InputGroup,Input} from "native-base";

export const SearchBox = () => {
    return(
        <View style={styles.searchBox}>
            <Text style={styles.label}>PickUp</Text>
            <InputGroup>
                <Input style={styles.inputSearch} placeholder="choose pickup location"/>
            </InputGroup>
        </View>
    );
};

export default SearchBox;