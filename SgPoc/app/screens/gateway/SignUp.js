import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    ToolbarAndroid,
    ActivityIndicator
} from 'react-native';
import { Header,Title,Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

import {styles} from './Styles';

export default class SignUp extends Component{

    constructor(props){
        super(props);
        this.state={
            loading:false,
            email:'',
            password:''
        }
    }


    async signUp(){
        this.setState({
            loading: true
        });
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                loading: false
            });

            alert('Your account was created!');

            this.props.navigator.push({
                component: DrawerNav
            });

        } catch (error) {
            console.log('received error response' + error);
            this.setState({
                loading: false
            })
        }
    }

    login(){

    }


    render(){
        // The content of the screen should be inputs for a username, password and submit button.
        // If we are loading then we display an ActivityIndicator.
        const content = this.state.loading ? <ActivityIndicator size="large"/> :
            <Content>
                <List>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}
                                placeholder={"Email Address"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                                secureTextEntry={true}
                                placeholder={"Password"} />
                        </InputGroup>
                    </ListItem>
                </List>
                <Button style={styles.primaryButton} onPress={()=>this.signUp()}>
                    Signup
                </Button>
                <Button onPress={()=>this.login()} style={styles.primaryButton}>
                    Go to Login
                </Button>
            </Content>
        ;
        // A simple UI with a toolbar, and content below it.
        return (
            <Container>
                <Header>
                    <Title>Sign Up</Title>
                </Header>
                {content}
            </Container>
        )
    }
}