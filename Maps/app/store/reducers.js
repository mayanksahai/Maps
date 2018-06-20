import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/home/modules/home";
import { TrackDriverReducer as trackDriver} from "../routes/trackDriver/modules/trackDriver";

export const makeRootReducer = () => {
    return combineReducers({
        home, trackDriver
    });
}

export default makeRootReducer;