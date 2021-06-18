import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = props => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text style={styles.text}>Hours</Text> 
                    <Text style={[styles.text, {fontWeight: 'bold'}]}> Manager</Text>
                </View>
            </View>

        </View>
    );
};
export default SplashScreen;


const styles = StyleSheet.create({
    wrapper: {
        flex: 1, 
        backgroundColor: "#15151F", 
        justifyContent: "center", 
        alignItems:"center"
    },
    content: {
        height: 300, 
        display: "flex", 
        justifyContent: "space-around", 
        alignItems:"center"
    },
    title: {
        display:"flex", 
        flexDirection:"row"
    },
    text: {
        color:"white", 
        fontSize: 40
    }
})
