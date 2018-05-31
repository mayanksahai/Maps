
import Home from "../components/Home";
//import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCurrentLocation, getInputData, selectedSearchTab, getAddressSuggestions, getSelectedAddress, bookCar, getNearByDrivers } from "../modules/home";
//import * as HomeActionCreators from "../modules/home";

const mapStateToProps = (state) => ({
    region:state.home.region,
    inputData:state.home.inputData || {},
    resultTypes:state.home.resultTypes || {},
    predictions:state.home.predictions || [],
    selectedAddress:state.home.selectedAddress || {},
    fare:state.home.fare,
    booking:state.home.booking || {},
    nearByDrivers:state.home.nearByDrivers || []
});

const mapActionCreators = {
    getCurrentLocation,getInputData,selectedSearchTab,getAddressSuggestions,getSelectedAddress,bookCar, getNearByDrivers
};

//function mapDispatchToProps(dispatch){ return bindActionCreators(HomeActionCreators,dispatch)}

export default connect(mapStateToProps,mapActionCreators)(Home);