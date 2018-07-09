import { connect } from "react-redux";
import PendingBookings from "../components/PendingBookings";
import {
    getPendingBookings,registerMe,acceptBooking,rejectBooking,getDriverCurrentLocation,notifyDriverLocationToServer
} from "../modules/bookingInfo";

const mapStateToProps = (state) => ({
    pendingBookings: state.bookingInfo.pendingBookings || [],
    driverLocation:state.bookingInfo.driverLocation || {},
    driverId:"5b0b5d4e60b4262c244bed22",
    driverRegistered:state.bookingInfo.driverRegistered || false
});

const mapActionCreators = {
    getPendingBookings,registerMe,acceptBooking,rejectBooking,getDriverCurrentLocation,notifyDriverLocationToServer
};
export default connect(mapStateToProps, mapActionCreators)(PendingBookings);