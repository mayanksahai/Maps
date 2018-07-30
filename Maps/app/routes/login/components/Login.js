import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import {Container,View } from 'native-base';
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";

class Login extends Component{

    constructor(props){
        super(props);
        this.state={};
    }

    setInputData= (key,val) => {
        this.setState({...this.state, [key]: val})
    }
     
    login = () =>{
        const { username,password } = this.state
        console.log("login done::" + username + password);
    }

    signUp = () => {
        console.log("sign up please");
    }

    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Image style={styles.logo}
                        source={require('../../../assets/images/waterfall.jpg')}/>
                <View style={styles.loginFormContainer}>
                    <LoginForm login={this.login} signUp={this.signUp} setInputData={this.setInputData}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3498db'
    },
    logo:{
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    logoContainer:{
        alignItems:'center',
        flexGrow:1,
        justifyContent:'center'
    },
    loginFormContainer:{
        position: 'absolute',
        top: 150,
        bottom: 150,
        left: 20,
        right: 20
    }
});

export default Login;