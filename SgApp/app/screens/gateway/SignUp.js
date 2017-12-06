import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    ToolbarAndroid,
    ActivityIndicator
} from 'react-native';
import { Header,Title,Container, Content, List, ListItem, Form, InputGroup, Input, Icon, Text, Picker, Button , Item as FormItem } from 'native-base';

import {styles} from './Styles';
import * as firebase from 'firebase';

const Item = Picker.Item;
export default class SignUp extends Component{

    constructor(props){
        super(props);
        this.usersRef=firebase.database().ref('/Users');
        this.state={
            loading:false,
            email:'',
            password:'',
            shortName:'',
            companyName:'',
            role:'Supplier',
            mobile:'',
            country:'',
            pinCode:''
        }
    }

    onValueChange(value: string){
        this.setState({
            role: value
        });
    }

    async signUp(){
        const { navigate } = this.props.navigation;
        this.setState({
            loading: true
        });
        try {
            var newUser = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            console.log('authenticated  new user' + newUser);

            this.usersRef.child(this.state.companyName).set({
                id: newUser['uid'],
                email:this.state.email,
                fullName:this.state.companyName,
                mobile:this.state.mobile,
                role:this.state.role,
                pinCode:this.state.pinCode,
                country:this.state.country
            });

            console.log('persisted new user' + newUser);
            this.setState({
                loading: false
            });

            alert('Your account was created!');

            navigate('Login');

        } catch (error) {
            console.log('received error response' + error);
            this.setState({
                loading: false
            })
        }
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
                    <ListItem>
                        <InputGroup>
                            <Icon name="barcode" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({companyName: text})}
                                value={this.state.companyName}
                                placeholder={"Company Name"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="arrow-dropdown" style={{ color: '#0A69FE' }} />
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.role}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Item label="Supplier" value="Supplier" />
                            <Item label="Client" value="Client" />
                        </Picker>
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="phone-portrait" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({mobile: text})}
                                value={this.state.mobile}
                                placeholder={"Mobile No."} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="pin" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({pinCode: text})}
                                value={this.state.pinCode}
                                placeholder={"PinCode"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="home" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({country: text})}
                                value={this.state.country}
                                placeholder={"Country"} />
                        </InputGroup>
                    </ListItem>
                </List>
                <Button style={styles.primaryButton} onPress={()=>this.signUp()}>
                    <Text>Signup</Text>
                </Button>
                <Button onPress={()=>this.login()} style={styles.primaryButton}>
                    <Text>Go to Login</Text>
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