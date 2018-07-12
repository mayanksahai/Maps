import { connect } from "react-redux";
import TrackTrip from "../components/TrackTrip";
import {
    getDistanceFromCustomer,getCurrentBooking,getDriverLatestLocation
} from "../modules/trackTrip";

const mapStateToProps = (state) => ({
    distanceFromDriver: state.trackTrip.distanceFromDriver,
    distanceFromDestination:state.trackTrip.distanceFromDestination,
    currentLocation:state.trackTrip.currentLocation,
    currentBooking:state.trackTrip.currentBooking
});

const mapActionCreators = {
    getDistanceFromCustomer,getCurrentBooking,getDriverLatestLocation
};
export default connect(mapStateToProps, mapActionCreators)(TrackTrip);