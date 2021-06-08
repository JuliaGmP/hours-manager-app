import React, { useState, useEffect, useRef } from "react";
import Login from "../components/LoginComponent";

const LoginContainer = (props) => {
    const { navigation } = props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const submit = async (email, password) => {
        setLoading(true);
        try {
            

        } catch (error) {
            setError(true)
        }
        setLoading(false);
    };

    return <Login loading={loading} submit={submit} error={error}/>;
};

export default LoginContainer;
