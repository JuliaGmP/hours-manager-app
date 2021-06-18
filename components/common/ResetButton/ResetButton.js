import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./ReserButton.css";

const ResetButton = props => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={props.onClick} activeOpacity={1}>
                <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};
export default ResetButton;
