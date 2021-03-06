import React from "react";
import {Scene,Actions} from "react-native-router-flux";
import HomeContainer from "./home/containers/HomeContainer";
import TrackDriverContainer from "./trackDriver/container/TrackDriverContainer";
import DriverBookingsContainer from "./driver/container/DriverBookingsContainer";
import TrackTripContainer from "./trackTrip/container/TrackTripContainer";
import LoginContainer from "./login/container/LoginContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="home" component={HomeContainer} title="home"/>
        <Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>
        <Scene key="pendingBookings" component={DriverBookingsContainer} title="pendingBookings"/>
        <Scene key="trackTrip" component={TrackTripContainer} title="trackTrip"/>
        <Scene key="login" component={LoginContainer} title="login" initial />
    </Scene>
);

export default scenes;