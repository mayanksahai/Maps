import React , { Component } from 'react'
import MapView from 'react-native-maps';
//import * as FoursquareActionCreators from '../../redux/actions/Foursquare';
import styles from './styles';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import RecommendationsMap from './RecommendationsMap';
import { Screen, Spinner} from '@shoutem/ui';
import { OverlayTopics, BottomTopics } from './SupplierTopics';
import { stringify as queryString } from 'query-string';

const CLIENT_ID = 'TR0NCWZ2CFRRI1BM5UR5QFUXGLYAERNXI3OELTPI34VTHGCP';
const CLIENT_SECRET = 'HCTXSXZ3PAWIMQHUFIRNCMK0FQ2MSFXG5JHXN3Q2FXSWODV0';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 20000;

// const mapStateToProps = (state) => {
//     return{
//         recommendations:state.recommendations,
//         inProgress:state.inProgress,
//         error:state.error
//     };
// }
//
// function mapDispatchToProps(dispatch){
//     return bindActionCreators(FoursquareActionCreators,dispatch);
// }

export default class Recommendations extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            gpsAccuracy: 5,
            recommendations: [],
            lookingFor: 'Food',
            headerLocation: null,
            last4sqCall: null
        }
        this.watchID = null
    }

    componentWillMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }

            this.onRegionChange(region);
        });
        let region = {
            latitude: 1.3048,
            longitude: 103.8318,
            latitudeDelta: 0.00922*1.5,
            longitudeDelta: 0.00421*1.5
        }
        setTimeout(() => {this.onRegionChange(region)}, 5000);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    async onRegionChange(region) {
        await this.fetchVenues(region, this.state.lookingFor);
        console.log('latest recommendations' + this.state.recommendations);
        this.setState({
            mapRegion: region,
        });
    }

    shouldFetchVenues(lookingFor) {
        return lookingFor != this.state.lookingFor
            || this.state.last4sqCall === null
            || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
    }

    async fetchVenues(region, lookingFor) {
        if (!this.shouldFetchVenues(lookingFor)) return;
        await this.foursquareQuery(region,lookingFor, this.state.gpsAccuracy);
    }

    onTopicSelect(lookingFor) {
        this.fetchVenues(this.state.mapRegion, lookingFor);

        this.setState({
            lookingFor: lookingFor
        });
    }

   venuesQuery({ latitude, longitude }, lookingFor, gpsAccuracy) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170305,
            ll: `${latitude}, ${longitude}`,
            llAcc: gpsAccuracy,
            section: lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }

    async foursquareQuery(region, lookingFor, gpsAccuracy){
            try {
                const query = this.venuesQuery(region, lookingFor, gpsAccuracy);
                let recommendations = await fetch(`${FOURSQUARE_ENDPOINT}?${query}`);
                let recommendationsJson = await recommendations.json();
                if (recommendationsJson.response.groups) {
                    this.setState({
                        recommendations: recommendationsJson.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        ),
                        headerLocation: recommendationsJson.response.headerLocation,
                        last4sqCall: new Date()
                    });
                }
            } catch (error) {
                console.error(error);
            }
    }

    render(){
        const { mapRegion, lookingFor } = this.state;

        if (mapRegion) {
            return (
                <Screen>
                    <RecommendationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />

                    {!lookingFor ? <OverlayTopics onTopicSelect={this.onTopicSelect.bind(this)} />
                        : <BottomTopics onTopicSelect={this.onTopicSelect.bind(this)} />}
                </Screen>
            );
        }else{
            return (
                <Screen style={styles.centered}>
                    <Spinner styleName="large" />
                </Screen>
            );
        }
    }
}

//export default connect(mapStateToProps,mapDispatchToProps)(Recommendations);
//export default Recommendations;