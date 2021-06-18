import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Picker,Switch,ActionSheetIOS,Platform,Image} from "react-native";
import {formatHour} from "../../../services/utils"
import LottieView from "lottie-react-native";
import moment from 'moment';
import 'moment/locale/es.js';
moment.locale('es');

const ProjectsDetailComponent = (props) => {
    const {day, refresh} = props;

    return (
        <View style={{ flex: 1, padding: 30}}>
            <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                        <Image style={{width:20, height:20, marginBottom:30}} resizeMode="stretch" source={require("../../../assets/closeX.png")} />   
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("AddHours", { refresh: refresh, day: day })}>
                        <Image style={{width:20, height:20, marginBottom:30}} resizeMode="stretch" source={require("../../../assets/editPencilIcon.png")} />   
                    </TouchableOpacity>
            </View>
            <Text style={styles.title}>
                    {day !== undefined && moment(day[0].date).format('dddd').toUpperCase()}
            </Text>
            <View style={{flexDirection:"row", paddingVertical:10}}>
                <Image style={{width:20, height:20, marginRight:10}} resizeMode="stretch" source={require("../../../assets/projectsList.png")} />   
                <Text style={styles.text}>Proyectos</Text>
            </View>
            {day && day.length !== 0 ? day.map((item, index)=>{
                return (
                    <View style={{flexDirection:"row", height:50, alignItems:"center"}} key={index}>
                        <Text style={[styles.text, {width:"50%"}]}>{item.projectName}</Text>
                        <Text style={styles.hoursText}>{formatHour(item.number_hours)}</Text>
                    </View>
                )
            }):
            <View style={styles.lottieView}>
            <LottieView
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "transparent"
                }}
                source={require("../../../assets/lottie/loadingBlack.json")}
                autoPlay
                loop
            />
            </View>
            }

            
        </View>
    )
};

export default ProjectsDetailComponent;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 20,
        flex: 1,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        width: "100%",
        height: 50,
        paddingVertical: 10
    },
    text: {
        fontSize: 17,
        fontWeight: "bold",
    },
    hoursText: {
        fontSize: 17,
    },
    title: {
        paddingVertical:30,
        fontSize: 20,
    },
    lottieView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})
