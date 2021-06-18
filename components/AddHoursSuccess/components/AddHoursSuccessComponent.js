import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Picker,Switch,ActionSheetIOS,Platform,Image} from "react-native";
import {formatHour} from "../../../services/utils"
import Button from "../../common/Button/Button";

const AddHoursSuccessComponent = (props) => {

    
    return (
        <View style={{ flex: 1, padding: 30, alignItems:"center"}}>
            <View style={styles.titleContainer}>
                <View style={styles.itemTitle}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{color:"#FF3C3C"}}>
                                {"< Atrás"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemTitleCenter}>
                    <Text style={styles.title}>
                        Añadir tiempo
                    </Text>
                </View>
                <View style={styles.itemTitle}></View>
            </View>
            <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
                <Image style={{width:90, height:90, marginBottom:30}} resizeMode="contain" source={require("../../../assets/success.png")} />   
                <Text style={styles.title}>
                    Tiempo {props.navigation.state.params.editDayText ? "editado" : "añadido"} correctamente                   
                </Text>
                <Text style={styles.subtitle}>
                    Tiempo introducido: {formatHour(props.hours)}
                </Text>
                <View style={{width:150, marginTop:40}}>
                    <Button text="ACEPTAR" onClick={() => {props.navigation.navigate("Home")}}/>
                </View>
            </View>

            
        </View>
    )
};

export default AddHoursSuccessComponent;

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
        width: "100%",
        height: 50,
        padding: 10
    },
    itemTitleCenter: {
        flex: 3,
        justifyContent: "center",
    },
    itemTitle: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    subtitle: {
        fontSize: 15,
        textAlign: "center",
        color: "#757575"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom:10
    }
})
