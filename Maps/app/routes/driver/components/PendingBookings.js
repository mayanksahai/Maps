import React, { Component } from 'react';
import {Container,View } from 'native-base';
import AcceptBooking from './acceptBooking';
import HeaderComponent from "../../../components/headerComponent";
import FooterComponent from "../../../components/footerComponent";
const taxiLogo = require("../../../assets/images/taxi.png")

import io from 'socket.io-client';
// const socketURL = 'http://trackinglocation.skylab.vn'
const socketURL = 'http://localhost:3000'
class PendingBookings extends Component {

    constructor(props){
        super(props); 
        this.socket=io(socketURL);
        this.socketId
    }

    componentDidMount() {
        this.props.getDriverCurrentLocation();       
        this.props.getPendingBookings();
        const socket = this.socket;
        if (!socket) return;

        socket.on("connect",()=>{
            this.socketId = socket.id;
        });    
    }

    componentDidUpdate(nextProps){
        if(this.props.driverLocation.latitude && nextProps.driverLocation.latitude != this.props.driverLocation.latitude
                     && !this.props.driverRegistered){
            var data = {
                driverId:this.props.driverId,
                socketId:this.socketId,
                driverLocation:this.props.driverLocation
            };
            this.props.registerMe(data);
        }
    }

    acceptsBooking(bookingId){
        if(this.props.driverLocation.latitude){
            var driverCurrentData = {
                "socketId":this.state.socket.id,
                "location":this.props.driverLocation,
                "driverId":this.props.driverId,
                "bookingId":bookingId
            };
            this.props.acceptBooking(driverCurrentData);
        }
    }
    
    render() {
        return (
          <Container>
            <HeaderComponent/>
            {this.props.driverLocation.latitude && 
            <View style={{flex:1}}>
                <AcceptBooking pendingBookings={this.props.pendingBookings} 
                                acceptBooking={this.acceptsBooking}
                                rejectBooking={this.props.rejectBooking}/>
            </View>
            }
            <FooterComponent/>
          </Container>);
      }
}

export default PendingBookings;
