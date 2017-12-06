import React, {Component} from 'react';
import {Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button} from 'native-base';
import store from '../../redux';

export default class SupplierHome extends Component{

    constructor(props){
        super(props);
        this.state= {
            loggedInUser:{}
        }
        store.subscribe(() => {
            this.setState({
                loggedInUser: store.getState().loggedInUser
            });
        });
    }

    render(){
        console.log('logged in supplier is' + this.state.loggedInUser.fullName);
        return (
            <Container>
                <Content>
                    <Text>Welcome Supplier</Text>
                </Content>
            </Container>
        );
    }
}
