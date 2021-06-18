import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";
import AddHoursSuccessComponent from "../components/AddHoursSuccessComponent";
import { updateUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHours } from "../../../services/hours";

const AddHoursSuccess = (props) => {
    props.navigation.state.params.refresh()
    const [hours, setHours] = useState(props.navigation.state.params.hours);
    return <AddHoursSuccessComponent {...props} hours={hours}/>;
};
const mapStateToProps = (store) => ({
    user: store.userReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddHoursSuccess);