import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Picker,Switch,ActionSheetIOS,Image} from "react-native";
import {formatHourNumber, formatHour} from "../../../services/utils"
import Button from "../../common/Button/Button";
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import _ from "lodash";

const AddHoursComponent = (props) => {
    const {projects, dayHoursToEdit} = props;
    const [selectedProject, setSelectedProject] = useState();
    const [date, setDate] = useState(moment().format("dddd DD MMM"));
    const [startHour, setStartHour] = useState(moment("0:00","HH:mm"));
    const [endHour, setEndHour] = useState(moment("0:00","HH:mm"));
    const [hours, setHours] = useState(0);
    const [isHoursRangeEnabled, setIsHoursRangeEnabled] = useState(false);
    const [error, setError] = useState(false);
    const [onPressAddHours, setOnPressAddHours] = useState(false);


    useEffect(() => {
        if (isHoursRangeEnabled){
        diffHours()}
    }, [endHour,startHour]);

    useEffect(() => {
        if (dayHoursToEdit !== null){
            setHours(_.find(dayHoursToEdit, {idProject: selectedProject}).number_hours)
        }
    }, [selectedProject]);

    useEffect(() => {
        if (dayHoursToEdit !== null){
            setSelectedProject(dayHoursToEdit[0].idProject)
            setDate(moment(dayHoursToEdit[0].date).format("dddd DD MMM"))
            setHours(dayHoursToEdit[0].number_hours)
        }
    }, [dayHoursToEdit]);

    useEffect(() => {
        setStartHour(moment("0:00","HH:mm"))
        setEndHour(moment("0:00","HH:mm"))
        if (isHoursRangeEnabled){
            setHours("0:00")
        }
        else {
            setHours(0)
        }
    }, [isHoursRangeEnabled]);

    const diffHours = () =>{
        const diffHours = endHour.diff(startHour,'hours')
        if(diffHours>=0){
            let mins = moment.utc(moment(endHour, "HH:mm").diff(moment(startHour, "HH:mm"))).format("mm")            
            setHours(diffHours + ":" + mins)
            ;}
        else {
            setError(true)
            setTimeout(() => {setError(false)}, 5000)
        }
    }

    const toggleSwitch = () => {
        setIsHoursRangeEnabled(!isHoursRangeEnabled)
    };

    const timer = useRef(false) 

    const addMinutes = 
       () => {
        setHours((hours)=> hours + (1/60))
        timer.current = setInterval(() => setHours((hours)=> hours + (1/60)), 50)
    }

    const subsMinutes = 
    () => {
     setHours((hours)=> hours - (1/60))
     timer.current = setInterval(() => setHours((hours)=> hours - (1/60)), 100)
 }


 
    return (
        <View style={{ flex: 1, justifyContent: "space-around",paddingVertical: 20, paddingHorizontal: 30}}>
            <View style={styles.titleContainer}>
                <View style={styles.itemTitle}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{color:"#FF3C3C"}}>
                                {"< Atrás"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemTitleCenter}>
                    <Text style={styles.title}>
                        {dayHoursToEdit ?"Editar tiempo" : "Añadir tiempo"}
                    </Text>
                </View>
                <View style={styles.itemTitle}></View>
            </View>
            <View style={{borderWidth: 1, borderColor:"#E5E5E5", width: "100%", height:50, justifyContent:"center", borderRadius: 10}}>
                {
                    projects && projects.length !== 0 &&
                    <RNPickerSelect
                        value={selectedProject}
                        style ={pickerSelectStyles}
                        onValueChange={(value) => setSelectedProject(value)}
                        items={projects.map((project)=> {return { label: project.name, value: project.id }})}
                    />
                }
            </View>
            <Text bold style={styles.text}>
                Fecha
            </Text>
            <View style={{borderWidth: 1, borderColor:"#E5E5E5", width: 200, borderRadius: 10}}>
                <DatePicker
                    style={{width: 200, height: 50}}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="dddd DD MMM"
                    maxDate={moment().format("dddd DD MMM").toString()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require("../../../assets/datePickerIcon.png")}
                    customStyles={{
                      dateIcon: {
                        width:20,
                        height:20,
                        position: 'absolute',
                        left: 15,
                        top: 15
                      },
                      dateInput: {
                        marginTop:10,
                        marginLeft: 30,
                        borderWidth: 0
                      }
                    }}
                    onDateChange={(date) => {setDate(date)}}
                />
            </View>
            <Text bold style={styles.text}>
                Tiempo
            </Text>
            {isHoursRangeEnabled ? 
            <View>
                <Text bold style={styles.textHours}>
                    {hours}
                </Text>
                <View style={{flexDirection:"row", justifyContent:"center", alignItems: "center"}}>
                    <View style={{borderWidth: 1, borderColor:"#E5E5E5", width: 100, borderRadius: 10}}>
                        <DatePicker
                            style={{width: 100, height: 50}}
                            date={startHour}
                            mode="time"
                            is24Hour= {true}
                            placeholder="select date"
                            format = "HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                              dateInput: {
                                marginTop:10,
                                borderWidth: 0
                              }
                            }}
                            onDateChange={(date) => {setStartHour(moment(date,"HH:mm"))}}
                        />
                    </View>
                    <Text style={{paddingHorizontal:20}}>-</Text>
                    <View style={{borderWidth: 1, borderColor:"#E5E5E5", width: 100, borderRadius: 10}}>
                        <DatePicker
                            style={{width: 100, height: 50}}
                            date={endHour}
                            mode="time"
                            is24Hour= {true}
                            placeholder="select date"
                            format = "HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                              dateInput: {
                                marginTop:10,
                                borderWidth: 0
                              }
                            }}
                            onDateChange={(date) => {setEndHour(moment(date,"HH:mm"))}}
                        />
                    </View>
                </View> 
                {error ? <Text style={[styles.text,{color:"red", fontSize:15}]}>La hora final no puede ser anterior a la hora de inicio.</Text>:null}
            </View>
            : 
            <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"center" }}>
                <TouchableOpacity onPressIn={()=>{if(hours > 0) subsMinutes()}} onPressOut={()=>clearInterval(timer.current)}>          
                    <Image style={{width:30, height:30}} resizeMode="contain" source={require("../../../assets/subtractHours.png")} />   
                </TouchableOpacity>
                <Text bold style={styles.textHours}>
                    {formatHour(hours)}
                </Text>
                <TouchableOpacity onPressIn={()=>{if(hours < 12) addMinutes()}} onPressOut={()=>clearInterval(timer.current)}>     
                    <Image style={{width:30, height:30}} resizeMode="contain" source={require("../../../assets/addHoursIcon.png")} />   
                </TouchableOpacity>
            </View>
                }
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Switch
                  trackColor={{ false: "#E4E4E4", true: "#90EE90" }}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="#E4E4E4"
                  onValueChange={toggleSwitch}
                  value={isHoursRangeEnabled}
                />
                <Text style={[styles.text, {marginLeft:10}]}>Hora Inicio/Fin</Text>
            </View>
            <View style={{flexDirection:"row", width:"100%", justifyContent:"flex-end"}}>
                {/*<View style={{minWidth:"30%"}}>
                    <Button text="AÑADIR MÁS" onClick={() => {}}/>
                </View>*/}
                <View style={{minWidth:"30%", marginLeft:30}}>
                    <Button disabled={selectedProject && (hours>0 || hours[0] >0) ? false : true} text="AÑADIR" onClick={() => {
                        if(hours>0 || hours[0] >0){
                            props.submitHours(selectedProject, formatHourNumber(hours), date)
                        }
                        }}/>
                </View>

            </View>
          
        </View>
    );
};

export default AddHoursComponent;

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
    title: {
        fontSize: 25,
        textAlign: "center",
    },
    text: {
        fontSize: 20
    },
    textHours: {
        fontSize: 50,
        fontWeight:"bold",
        textAlign: "center",
        marginBottom:10
    }
})
