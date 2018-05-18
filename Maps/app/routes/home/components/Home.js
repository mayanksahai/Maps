import React, {Component} from "react";
import {View,Text} from "react-native";

import {Container} from "native-base";
import MapContainer from "./mapContainer/index";

class Home extends Component{

    componentDidMount(){
        this.props.getCurrentLocation();
    }

    render(){
        return(
            <Container>
                { this.props.region.latitude &&
                    <MapContainer region={this.props.region}/>
                }
            </Container>
        );
    }
}

export default Home;