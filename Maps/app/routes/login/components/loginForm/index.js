import React from "react";
import {Container,Content,Form,Item,Input,Button,Text,View} from "native-base";
import {Image,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";


export const LoginForm = ({login,signUp,setInputData}) =>{

    return(
        <Container style={styles.container}>
            <Form style={styles.form}>
                <Item>
                <Input placeholder="Username" style={styles.input} returnKeyType="next" 
                    onSubmitEditing={() => this.passwordInput._root.focus()}
                    onChangeText={setInputData.bind(this, "username")}
                    keyboardType="email-address"/>
                </Item>
                <Item last>
                <Input placeholder="Password" style={styles.input} secureTextEntry returnKeyType="go"
                        getRef={(input) => this.passwordInput = input}
                        onChangeText={setInputData.bind(this, "password")}/>
                </Item>
            </Form>
            <View style={{paddingVertical:20}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={signUp}>
                <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>      
        </Container>
    );
}

export default LoginForm;