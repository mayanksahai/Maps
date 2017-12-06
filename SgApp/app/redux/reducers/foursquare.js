import {FOURSQUARE_IN_PROGRESS, FOURSQUARE_ERROR, FOURSQUARE_SUCCESS} from '../actions/Foursquare'

const defaultState = {
    inProgress:false,
    error:'',
    recommendations:[]
}

export function fetchFromFoursqaure(state=defaultState,action){
    switch (action.type) {
        case FOURSQUARE_SUCCESS:
            return {
                ...state,
                recommendations: action.recommendations,
            };
        case FOURSQUARE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case FOURSQUARE_IN_PROGRESS:
            return {
                ...state,
                inProgress: action.inProgress,
            };
        default:
            return state;
    }
}