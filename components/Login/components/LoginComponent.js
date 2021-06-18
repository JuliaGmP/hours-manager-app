import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Image, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import ResetButton from "../../common/ResetButton/ResetButton";

const LoginComponent = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <View style={styles.wrapper} >
            <View style={styles.overlay}>
                <View style={styles.title}>
                    <View style={styles.titleText}>
                        <Text style={styles.text}>Hours</Text> 
                        <Text style={[styles.text, {fontWeight: 'bold'}]}> Manager</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <Input inputProps={{ autoCapitalize: "none" }} icon={require("../../../assets/email.png")} placeholder="Email" onChange={(email) => setEmail(email)} />
                    <Input
                        inputProps={{ secureTextEntry: true, autoCapitalize: "none" }}
                        icon={require("../../../assets/padlock.png")}
                        placeholder="Contraseña"
                        onChange={(password) => setPassword(password)}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                     <Button
                      text="Iniciar sesión"
                      loading={props.loading}
                      onClick={() => {
                          Keyboard.dismiss();
                          props.submit(email, password);
                      }}
                     />
                </View> 
                {props.error && <Text style={{color: "red"}}>Error en el login</Text>}         
                
            </View>
        </View>
    );
};
export default LoginComponent;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems:"center",
        backgroundColor: "#292F36"
    },
    title: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
    },
    titleText: {
        display:"flex", 
        flexDirection:"row", 
        marginLeft: 15
    },
    text: {
        color:"white", 
        fontSize: 40
    },
    form: {
        width: "80%",
        height:"15%", 
        display: "flex", 
        justifyContent: "space-between",
        marginTop: 90
    },
    buttonWrapper: {
        width:"40%", 
        marginTop:70
    }, 
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        height: '100%',
        width: '100%'
    },
});

