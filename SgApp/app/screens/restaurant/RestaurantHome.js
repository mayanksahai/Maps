import React, {Component} from 'react';
import {Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button} from 'native-base';

export default class RestaurantHome extends Component{

    constructor(props){
        super(props);
        this.state = {
            loggedInUser:this.props.navigation.state.params.loggedInUser
        }
    }

    render(){
        return (
            <Container>
                <Header>
                    <Title>Restaurant Home</Title>
                </Header>
                <Content>
                    <Text>Welcome Restaurant</Text>
                </Content>
            </Container>
        );
    }
}
