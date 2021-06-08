import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Image, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";

const LoginComponent = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
            <View style={styles.wrapper}>
               <Text style={styles.text}>Login</Text>
            </View>
    );
};
export default LoginComponent;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems:"center",
        backgroundColor:"red",
        justifyContent:"center"
    },
    text:{
        color:"white"
    }
});

