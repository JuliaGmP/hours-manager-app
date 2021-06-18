import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomText from "../CustomText/CustomText";
import LottieView from "lottie-react-native";

import styles from "./Button.css";

const Button = (props) => {
    const { loading, text, gray } = props;

    // useEffect(() => {
    //     this.animation && this.animation.play();
    // }, []);

    const buttonType = () => {
        const { small, medium } = props;
        if (gray || props.disabled) return [styles.wrapper, {backgroundColor:"#E4E4E4"}]
        if (medium) return [styles.wrapper, styles.medium];
        return [styles.wrapper];
    };

    const textType = () => {
        const { small, medium, gray } = props;
        if (gray) return [styles.testGray]
        if (medium) return [styles.mediumText];
        return [styles.text];
    };

    return (
        <TouchableOpacity disabled={props.loading || props.disabled} style={buttonType()} onPress={props.onClick}>
            <View>
                {loading ? (
                    <LottieView
                        ref={(animation) => {
                            this.animation = animation;
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "transparent"
                        }}
                        source={require("../../../assets/lottie/loading.json")}
                        autoPlay
                        loop
                    />
                ) : (
                    <CustomText gray={gray} style={textType()}>{text}</CustomText>
                )}
            </View>
        </TouchableOpacity>
    );
};
export default Button;
