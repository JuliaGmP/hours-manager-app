import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";

import styles from "./Input.css";

const Input = (props) => {
    const { wrapperStyle, inputProps } = props;
    return (
        <View style={[styles.wrapper, wrapperStyle, { borderBottomColor: props.error ? "red" : props.isGrey ? "#D3D3D3" : "white", paddingHorizontal: props.icon ? 10 : 0 }]}>
            {props.icon ? <Image icon={props.icon} style={styles.icon} source={props.icon} resizeMode="contain" /> : null}
            <TextInput
                {...inputProps}
                value={props.value ? props.value : null}
                style={[styles.input, { marginLeft: props.icon ? 15 : 0, color: props.isGrey ? "grey" : "white", fontSize: props.icon ? 20 : 15 }]}
                placeholder={props.placeholder}
                placeholderTextColor="#b6b6b6"
                onChangeText={(text) => props.onChange(text)}
            />
        </View>
    );
};
export default Input;
