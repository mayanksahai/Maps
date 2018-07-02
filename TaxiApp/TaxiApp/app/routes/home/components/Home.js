import React, {Component} from "react";
import {View,Text} from "react-native";

import {Container} from "native-base";
import MapContainer from "./mapContainer/index";

class Home extends Component{

    componentDidMount(){
        this.props.setName();
    }

    render(){
        const region={
            latitude:36.390239,
            longitude:-94.223993,
            latitudeDelta:0.0922,
            longitudeDelta:0.0921

        }
        return(
            <Container>
                <MapContainer region={region}/>
            </Container>
        );
    }
}

export default Home;