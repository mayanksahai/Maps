import React , {Component} from 'react';
import { Subtitle, Title } from '@shoutem/ui';
import MapView from 'react-native-maps';
import Recommendation from './RecommendationMarker';
import styles from './styles';

const RecommendationsMap = ({mapRegion,gpsAccuracy,recommendations,lookingFor,headerLocation,last4sqCall,onRegionChange}) =>
    (
        <MapView.Animated region={mapRegion} style={styles.fullscreen}
                          onRegionChange={onRegionChange}>

            <Title>
                {lookingFor ? `${lookingFor} in` : ''} {headerLocation}
            </Title>

            <MapView.Circle center={mapRegion}
                            radius={gpsAccuracy*1.5}
                            strokeWidth={0.5}
                            strokeColor="rgba(66, 180, 230, 1)"
                            fillColor="rgba(66, 180, 230, 0.2)"
            />

            <MapView.Circle center={mapRegion}
                            radius={5}
                            strokeWidth={0.5}
                            strokeColor="rgba(66, 180, 230, 1)"
                            fillColor="rgba(66, 180, 230, 1)"
            />

            {recommendations.map(r => <Recommendation {...r} key={r.venue.id}/>)}


        </MapView.Animated>

);

export default RecommendationsMap;