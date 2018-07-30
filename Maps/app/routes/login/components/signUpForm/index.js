import React from "react";
import { Text,Image } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";


export const SignUpForm = ({logo}) =>{
    return(
        <Header style={{backgroundColor:"#FF5E3A"}} iosBarStyle="light-content">
            <Left>
                <Button transparent>
                    <Icon name="bars" style={styles.icon}/>
                </Button>
            </Left>
            <Image resizeMode="contain" style={styles.logo} source={logo}/>
            <Right>
                <Button transparent>
                    <Icon name="gift" style={styles.icon}/>
                </Button>
            </Right>
        </Header>
    );
}

export default SignUpForm;