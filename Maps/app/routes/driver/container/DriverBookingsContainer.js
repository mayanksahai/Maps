import { connect } from "react-redux";
import PendingBookings from "../components/PendingBookings";
import {
    getPendingBookings,acceptBooking,rejectBooking
} from "../modules/bookingInfo";

const mapStateToProps = (state) => ({
    pendingBookings: state.bookingInfo.pendingBookings || [],
});

const mapActionCreators = {
    getPendingBookings,acceptBooking,rejectBooking
};
export default connect(mapStateToProps, mapActionCreators)(PendingBookings);