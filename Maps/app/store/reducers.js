import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/home/modules/home";
import { TrackDriverReducer as trackDriver} from "../routes/trackDriver/modules/trackDriver";
import { BookingInfoReducer as bookingInfo} from "../routes/driver/modules/bookingInfo";

export const makeRootReducer = () => {
    return combineReducers({
        home, trackDriver, bookingInfo
    });
}

export default makeRootReducer;