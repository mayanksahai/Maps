import { connect } from "react-redux";
import Login from "../components/Login";
import {setLoginCredential} from "../module/login";

const mapStateToProps = (state) => ({
    loggedIn: state.login.loggedIn || false,
});

const mapActionCreators = {
    setLoginCredential
};
export default connect(mapStateToProps, mapActionCreators)(Login);