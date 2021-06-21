import React, { useState, useEffect, useRef } from "react";
import Login from "../components/LoginComponent";
import { updateUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../../services/auth";
import { getUserProfile } from "../../../services/user";
import { AsyncStorage } from "react-native";


const LoginContainer = (props) => {
    const { navigation } = props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const submit = async (email, password) => {
        setLoading(true);
        try {
            let token;
            const response = await login(email, password)
            if (response === undefined) throw new Error("Error en el login");
            if (response.error !== undefined) throw new Error(JSON.stringify(response.error));
            token = response.token;
            await AsyncStorage.setItem("token", token);

            const userProfile = await getUserProfile(token);
            const user = {
                email: email,
                token: token,
                name: userProfile.name,
                userId: userProfile.id,
                userCalendarID: userProfile.userCalendarID,
                rolesIDs: userProfile.rolesID
            };
            props.updateUser(user);
            setLoading(false);
            navigation.navigate("Home");

        } catch (error) {
            setError(true)
            console.log(error);
        }
        setLoading(false);
    };

    return <Login loading={loading} submit={submit} error={error}/>;
};
const mapStateToProps = (store) => ({
    user: store.userReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
