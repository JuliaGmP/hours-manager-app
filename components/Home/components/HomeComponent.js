import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert , Image, ActionSheetIOS, StyleSheet, Platform} from "react-native";
import {dateFormatter, getDayStringByNumber, formatHour, getTotalHoursInADay} from "../../../services/utils"
import Button from "../../common/Button/Button";
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';

const HomeComponent = (props) => {
    const { userCalendar, userName, hoursInAWeek, getHoursInAWeekContainer, refresh, selectedWeek, setSelectedWeek, closeSession } = props;
    const todayNumber = (new Date()).getDay() 

    useEffect(() => {
        if(selectedWeek=== "Semana pasada")
            getHoursInAWeekContainer(moment().subtract(7,"days"));
        if(selectedWeek=== "Esta semana")
            getHoursInAWeekContainer(moment());
    }, [selectedWeek]);

    const onPressEditIos = (day) =>
    ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Editar"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            props.navigation.navigate("AddHours", { refresh: refresh, day: day })
          }
        }
    );

    const onPressEditAndroid = (day) =>props.navigation.navigate("AddHours", { refresh: refresh, day: day })

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={()=>closeSession()}><Text>Cerrar sesión</Text></TouchableOpacity>
            <View style={styles.welcomeContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.welcomeTitle}>Bienvenido de nuevo, </Text>
                    <Text style={[styles.welcomeTitle,{fontWeight: 'bold'}]}>{userName}</Text>
                </View>
                <Text style={styles.welcomeDate}>{dateFormatter()}</Text>
            </View> 
            <View style={styles.buttonWrapper}>
                <Button
                    text="Añadir horas"
                    onClick={() => {
                        props.navigation.navigate("AddHours", { refresh: refresh })
                    }}
                />
            </View>
            <View style={styles.userCalendarContainer}>
                <View style={styles.selectorContainer}>
                    <Text style={styles.userCalendarText}>Semana </Text>
                </View>
                <View style={styles.selectorContainer}>
                    <RNPickerSelect
                        value={selectedWeek}
                        style ={pickerSelectStyles}
                        onValueChange={(value) => setSelectedWeek(value)}
                        items={[{ label: "Esta semana", value: "Esta semana" },{ label: "Semana pasada", value: "Semana pasada" }]}
                    />
                </View>

                <View style={styles.daysContainer}>

                {hoursInAWeek  && hoursInAWeek.length ? hoursInAWeek.map((day,index) => { 
                    return (
                        index < 5 ? 
                        <View style={[styles.dayCardContainer, {borderBottomWidth: index < 4 ? 2 : 0}]} key={index}>
                            <TouchableOpacity style={styles.cardData} onPress={()=> {if(day.length !== 0)props.navigation.navigate("ProjectsDetail", { refresh: refresh, day: day })}}>
                                <Text style={styles.userCalendarText}>{getDayStringByNumber(index)}</Text>
                                {todayNumber === index + 1 && day.length === 0 && selectedWeek=== "Esta semana" ? 
                                <TouchableOpacity onPress={()=>{props.navigation.navigate("AddHours", { refresh: refresh })                        }}>
                                    <Image style={styles.cardImage} resizeMode="contain" source={require("../../../assets/addDays.png")} /> 
                                </TouchableOpacity>
                                : day.length === 0 ?
                                <Image style={styles.cardImage} resizeMode="contain" source={todayNumber <= index + 1 && selectedWeek=== "Esta semana" ? require("../../../assets/noHours.png") : require("../../../assets/warning.png")} />
                                : <Text style={styles.userCalendarText}>{getTotalHoursInADay(day)}</Text>
                                }
                            </TouchableOpacity>  
                            {!(todayNumber < index + 1 && selectedWeek=== "Esta semana") && day.length !== 0 && 
                            (Platform.OS === "ios" ? 
                            <TouchableOpacity style={styles.editButtonContainer}  onPress={()=>onPressEditIos(day)}>
                                <Image style={{height:20}} resizeMode="contain" source={require("../../../assets/editIcon.png")} />
                            </TouchableOpacity> : 
                            <TouchableOpacity style={styles.editButtonContainer}  onPress={()=>onPressEditAndroid(day)}>
                                <Image style={{height:20}} resizeMode="contain" source={require("../../../assets/editIcon.png")} />
                            </TouchableOpacity>)
                            }
                        </View> : null
                    ) 
                }) 
                : 
                <EmptyWeek todayNumber={todayNumber}/>
                }

                </View>
            </View>
        </View>
    );
};

const EmptyWeek = (props) => {
    const { todayNumber } = props;
    return(
        <View style={{flex:1, height:"100%", justifyContent:"space-between"}}>
            <View style={{display:"flex",alignItems:"center", padding:10, flex:1, flexDirection:"row", justifyContent: "space-between", alignItems:"center", borderBottomColor: '#E2E2E2',borderBottomWidth: 2}}>
                <Text style={styles.userCalendarText}>Lunes</Text>
                <Image style={{width:30, height:30, marginRight: 20}} resizeMode="contain" source={todayNumber <= 1 ? require("../../../assets/noHours.png") : require("../../../assets/warning.png")} />   
            </View> 
            <View style={{display:"flex",alignItems:"center", padding:10, flex:1, flexDirection:"row", justifyContent: "space-between", alignItems:"center", borderBottomColor: '#E2E2E2',borderBottomWidth: 2}}>
                <Text style={styles.userCalendarText}>Martes</Text>
                <Image style={{width:30, height:30, marginRight: 20}} resizeMode="contain" source={todayNumber <= 2 ? require("../../../assets/noHours.png") : require("../../../assets/warning.png")} />   
            </View> 
            <View style={{display:"flex",alignItems:"center", padding:10, flex:1, flexDirection:"row", justifyContent: "space-between", alignItems:"center", borderBottomColor: '#E2E2E2',borderBottomWidth: 2}}>
                <Text style={styles.userCalendarText}>Miércoles</Text>
                <Image style={{width:30, height:30, marginRight: 20}} resizeMode="contain" source={todayNumber <= 3 ? require("../../../assets/noHours.png") : require("../../../assets/warning.png")} />   
            </View> 
            <View style={{display:"flex",alignItems:"center", padding:10, flex:1, flexDirection:"row", justifyContent: "space-between", alignItems:"center", borderBottomColor: '#E2E2E2',borderBottomWidth: 2}}>
                <Text style={styles.userCalendarText}>Jueves</Text>
                <Image style={{width:30, height:30, marginRight: 20}} resizeMode="contain" source={todayNumber <= 4 ? require("../../../assets/noHours.png") : require("../../../assets/warning.png")} />   
            </View> 
            <View style={{display:"flex",alignItems:"center", padding:10, flex:1, flexDirection:"row", justifyContent: "space-between", alignItems:"center", borderBottomColor: '#E2E2E2',borderBottomWidth: 0}}>
                <Text style={styles.userCalendarText}>Viernes</Text>
                <Image style={{width:30, height:30, marginRight: 20}} resizeMode="contain" source={todayNumber <= 5 ? require("../../../assets/noHours.png") : require("../../../assets/warning.png")} />   
            </View> 
        </View>
    )

};

export default HomeComponent;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: 'black',
      paddingRight: 30
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: 'black',
      paddingRight: 30
    },
  });


const styles = StyleSheet.create({
    wrapper:{
        flex: 1, 
        justifyContent: "space-between", 
        alignItems:"center", 
        padding: 30
    },
    titleContainer:{
        display:"flex", 
        flexDirection:"row"
    },
    welcomeContainer: {
        marginTop: 10,
    },
    welcomeTitle: {
        color: "#686868",
        marginTop: 20,
        fontSize: 15
    },
    welcomeDate: {
        marginTop: 10,
        fontSize: 30
    },
    buttonWrapper:{
        width:200, 
        paddingVertical:20
    },
    selectorContainer:{
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 2, 
        padding:10
    },
    daysContainer:{
        flex:1, 
        justifyContent:"space-between"
    },
    dayCardContainer:{
        display:"flex",
        alignItems:"center", 
        paddingHorizontal:30, 
        flex:1,
        flexDirection:"row", 
        alignItems:"center", 
        borderBottomColor: '#E2E2E2'
    },
    cardData:{
        flexDirection:"row", 
        flex: 1, 
        justifyContent:"space-between"
    },
    cardImage:{
        width:30, 
        height:30
    },
    editButtonContainer:{
        height:20, 
        width:40, 
        alignItems:"flex-end"
    },
    userCalendarContainer: {
        width: "100%", 
        flex:1,
        
    },
    userCalendarText: {
        color: "#686868",
        fontSize: 20
    },
    
});

