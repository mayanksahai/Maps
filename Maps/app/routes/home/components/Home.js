import React, {Component} from "react";
import {View} from "react-native";
import {Actions} from "react-native-router-flux";

import {Container} from "native-base";
import MapContainer from "./mapContainer/index";
import HeaderComponent from "../../../components/headerComponent";
import FooterComponent from "../../../components/footerComponent";
import Fare from "./fare";
import Fab from "./fab";
import FindDriver from "./findDriver";

const taxiLogo = require("../../../assets/images/taxi.png")
const carMarker = require("../../../assets/images/carMarker.png")

class Home extends Component{

    componentDidMount(){
        var rx = this;
        this.props.getCurrentLocation();
        setTimeout(function(){
            rx.props.getNearByDrivers();
        },1000);
    }

    componentDidUpdate(){
        if(this.props.booking.status === "confirmed"){
            Actions.trackDriver({type:"reset"});
        }
    }

    render(){
        const {status} = this.props.booking;
        return(
            <Container>
                { (status !== "pending") &&

                    <View style={{flex:1}}>
                        <HeaderComponent logo={taxiLogo}/>
                        { this.props.region.latitude &&
                            <MapContainer region={this.props.region}
                                          getInputData={this.props.getInputData}
                                          selectedSearchTab={this.props.selectedSearchTab}
                                          getAddressSuggestions={this.props.getAddressSuggestions}
                                          resultTypes={this.props.resultTypes}
                                          predictions={this.props.predictions}
                                          getSelectedAddress={this.props.getSelectedAddress}
                                          selectedAddress={this.props.selectedAddress}
                                          carMarker={carMarker}
                                          nearByDrivers={this.props.nearByDrivers}

                            />
                        }
                        <Fab onPressAction={()=>this.props.bookCar()}/>
                        {
                            this.props.fare &&
                            <Fare fare={this.props.fare}/>
                        }
                        <FooterComponent/>
                    </View>

                    ||

                    <FindDriver selectedAddress={this.props.selectedAddress}/>

                }


            </Container>
        );
    }
}

export default Home;