import { stringify as queryString } from 'query-string';

const CLIENT_ID = 'TR0NCWZ2CFRRI1BM5UR5QFUXGLYAERNXI3OELTPI34VTHGCP';
const CLIENT_SECRET = 'HCTXSXZ3PAWIMQHUFIRNCMK0FQ2MSFXG5JHXN3Q2FXSWODV0';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';


export const FOURSQUARE_IN_PROGRESS = "Fetch_InProgress";
export const FOURSQUARE_ERROR = "Fetch_Error";
export const FOURSQUARE_SUCCESS = "Fetch_Success";

export function setFoursqaureSuccess(recommendations){
    return{
        type:FOURSQUARE_SUCCESS,
        recommendations
    };
}

export function setFoursqaureInProgress(inProgress){
    return{
        type:FOURSQUARE_IN_PROGRESS,
        inProgress
    };
}

export function setFoursqaureError(error){
    return{
        type:FOURSQUARE_ERROR,
        error
    };
}

export function venuesQuery({ latitude, longitude }, lookingFor, gpsAccuracy) {
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

export function fetchVenuesFromFourSquare(region, lookingFor, gpsAccuracy){
    return async dispatch =>
    {
        dispatch(setFoursqaureInProgress(true));
        try {
            const query = this.venuesQuery(region, lookingFor, gpsAccuracy);
            let recommendations = await
            fetch(`${FOURSQUARE_ENDPOINT}?${query}`);
            let recommendationsJson = await
            recommendations.json();
            let result = recommendationsJson.response.groups.reduce(
                (all, g) => all.concat(g ? g.items : []), []
            );
            dispatch(setFoursqaureSuccess(result));
            return result;
        } catch (error) {
            console.error(error);
            dispatch(setFoursqaureError(error));
        }
    }
}