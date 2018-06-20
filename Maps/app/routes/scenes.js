import React from "react";
import {Scene,Actions} from "react-native-router-flux";
import HomeContainer from "./home/containers/HomeContainer";
import TrackDriverContainer from "./trackDriver/container/TrackDriverContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="home" component={HomeContainer} title="home" initial/>
        <Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>
    </Scene>
);

export default scenes;