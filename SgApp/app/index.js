import React, {Component} from 'react';
import {Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button} from 'native-base';
import Firebase from './screens/store/Firebase';
import PrimaryNav from './screens/navigation/Navigation';
import {Provider} from 'react-redux';
import store from './redux';

export default class SgApp extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("initializing firebase..")
        Firebase.initialise();
    }

    render(){
        return(
            <Provider store={store}>
                <PrimaryNav/>
            </Provider>
        );
    }

}
