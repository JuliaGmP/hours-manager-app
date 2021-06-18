import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styles from "./CustomText.css";

const CustomText = (props) => {
    const { type = "null", color = "null", adaptText = false, numberOfLines  } = props;

    const getTextSize = (text) => {
        if (!adaptText || !text ) return;
        text = text.toString();

        const digitNumber = text.length;
        const defaultTextLength = 6;
        const defaultFontSize = 30;
        const digitDifference = digitNumber - defaultTextLength;
        let fontSize = defaultFontSize - digitDifference * 3;
        if (fontSize > defaultFontSize) fontSize = defaultFontSize;
        else if (fontSize < 0) {
            fontSize = 8;
        }
        return { fontSize };
    };

    function getTextStyle() {
        const style = {
            sectionTitle: () => styles.sectionTitle,
            sectionLastUpdated: () => styles.sectionLastUpdated,
            sectionSubtitle: () => styles.sectionSubtitle,
            sectionEmpty: () => styles.sectionEmpty,
            numberLarge: () => styles.numberLarge,
            numberMedium: () => styles.numberMedium,
            numberLabel: () => styles.numberLabel,
            cardTitle: () => styles.cardTitle,
            cardTextDefault: () => styles.cardTextDefault,
            cardEmptyText: () => styles.cardEmptyText,
            observation: () => styles.observation,
            null: () => {}
        };

        return (style[type] || style["null"])();
    }

    function getTextColor() {
        const style = {
            primary: () => styles.primaryColor,
            secondary: () => styles.secondaryColor,
            accent: () => styles.accentColor,
            null: () => {}
        };

        return (style[color] || style["null"])();
    }

    return <Text numberOfLines={numberOfLines} ellipsizeMode='tail' style={[styles.default, getTextStyle(), getTextColor(), props.style, getTextSize(props.children)]}>{props.children}</Text>;
};
export default CustomText;
