import React, { Component } from 'react';
import {Container,View } from 'native-base';
import AcceptBooking from './acceptBooking';
import HeaderComponent from "../../../components/headerComponent";
import FooterComponent from "../../../components/footerComponent";
const taxiLogo = require("../../../assets/images/taxi.png")
class PendingBookings extends Component {

    componentDidMount() {
        this.props.getPendingBookings();
    }
    
    render() {
        return (
          <Container>
            <HeaderComponent/>
            <View style={{flex:1}}>
                <AcceptBooking pendingBookings={this.props.pendingBookings} 
                                acceptBooking={this.props.acceptBooking}
                                rejectBooking={this.props.rejectBooking}/>
            </View>
            <FooterComponent/>
          </Container>);
      }
}

export default PendingBookings;
