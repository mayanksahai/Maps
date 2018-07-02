import React from "react";
import {Scene,Actions} from "react-native-router-flux";
import HomeContainer from "./home/containers/HomeContainer";
import TrackDriverContainer from "./trackDriver/container/TrackDriverContainer";
import DriverBookingsContainer from "./driver/container/DriverBookingsContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="home" component={HomeContainer} title="home"/>
        <Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>
        <Scene key="pendingBookings" component={DriverBookingsContainer} title="pendingBookings" initial/>
    </Scene>
);

export default scenes;