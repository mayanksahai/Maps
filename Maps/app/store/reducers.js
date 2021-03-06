import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/home/modules/home";
import { TrackDriverReducer as trackDriver} from "../routes/trackDriver/modules/trackDriver";
import { BookingInfoReducer as bookingInfo} from "../routes/driver/modules/bookingInfo";
import { TrackTripReducer as trackTrip} from "../routes/trackTrip/modules/trackTrip";
import { LoginReducer as login} from "../routes/login/module/login";

export const makeRootReducer = () => {
    return combineReducers({
        home, trackDriver, bookingInfo, trackTrip, login
    });
}

export default makeRootReducer;