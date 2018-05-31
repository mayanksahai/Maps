import React from "react";
import {Text} from "react-native";
import styles from "./searchBoxStyles";
import {View,InputGroup,Input} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

export const SearchBox = ({getInputData,selectedSearchTab,getAddressSuggestions,selectedAddress}) => {
    const {selectedPickUp,selectedDropOff} = selectedAddress || {};

    function handleInput(key,val){
        getInputData({
            key,
            value:val}
           );
        getAddressSuggestions();
    }


    return(
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PickUp</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A"/>
                    <Input onFocus={()=>selectedSearchTab("pickUp")}
                           style={styles.inputSearch}
                           placeholder="choose pickup location"
                           onChangeText={handleInput.bind(this, "pickUp")}
                           value={selectedPickUp && selectedPickUp.name}/>
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DropOff</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A"/>
                    <Input onFocus={()=>selectedSearchTab("dropOff")}
                           style={styles.inputSearch}
                           placeholder="choose drop off location"
                           onChangeText={handleInput.bind(this, "dropOff")}
                           value={selectedDropOff && selectedDropOff.name}/>
                </InputGroup>
            </View>
        </View>
    );
};

export default SearchBox;