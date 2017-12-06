import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button} from 'native-base';
import {styles} from './Styles';
import Feed from '../../screens/Feed';
import * as firebase from "firebase";

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: ''
        }
    }

    render(){
            // The content of the screen should be inputs for a username, password and submit button.
            // If we are loading then we display an ActivityIndicator.
            const content = this.state.loading ?
                <View style={styles.body}>
                    <ActivityIndicator size="large"/>
                </View> :

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
                    <Button style={styles.primaryButton} onPress={()=>this.login()}>
                        <Text>Login</Text>
                    </Button>
                    <Button onPress={()=>this.goToSignup()} style={styles.primaryButton}>
                        <Text>New Here?</Text>
                    </Button>

                </Content>
            ;

            // A simple UI with a toolbar, and content below it.
            return (
                <Container>
                    <Header>
                        <Title>Login</Title>
                    </Header>
                    {content}
                </Container>
            );
    }

    goToSignup(){
        const { navigate } = this.props.navigation;
        this.setState({
            loading: true
        });
        navigate('Feed');
    }

    async login(){
        const { navigate } = this.props.navigation;
        this.setState({
            loading: true
        });

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                loading: false
            });

            navigate('Feed');

        } catch (error) {
            console.log('received error response' + error);
            this.setState({
                loading: false
            });
            alert('Login Failed. Please try again or signUp'+error);
        }

    }
}
