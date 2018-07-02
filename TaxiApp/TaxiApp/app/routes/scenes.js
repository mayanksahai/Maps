import React from "react";
import {Scene,Actions} from "react-native-router-flux";
import HomeContainer from "./home/containers/HomeContainer";

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="home" component={HomeContainer} title="home" initial/>
    </Scene>
);

export default scenes;