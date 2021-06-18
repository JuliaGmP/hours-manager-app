import React, { useState, useEffect } from "react";
import SplashScreenComponent from "../components/SplashScreen";
import { getBasicUserInfo, getUserProfile } from "../../../services/user";
import { AsyncStorage } from "react-native";
import { updateUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const SplashScreen = (props) => {
    const { navigation, updateUser } = props;

    useEffect(() => {
        getUser();
        //navigateToLogin()
    }, []);

    const navigateToLogin = async () => {     
        setTimeout(()=> {
            navigation.navigate("Login");
        }, 2000);
    }

    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        const userProfile = await getUserProfile(token);
        if (userProfile.email && userProfile.id) {
            const user = {
                email: userProfile.email,
                token: token,
                name: userProfile.name,
                userId: userProfile.id,
                tenantID: userProfile.tenantID,
                userCalendarID: userProfile.userCalendarID,
                rolesIDs: userProfile.rolesID
            };
            props.updateUser(user);
            navigation.navigate("Home");
        } else {
            navigation.navigate("Login");
        }
    };

    return <SplashScreenComponent />;


};
const mapStateToProps = (store) => ({
    user: store.userReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
