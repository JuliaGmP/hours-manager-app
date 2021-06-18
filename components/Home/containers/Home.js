import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";
import Home from "../components/HomeComponent";
import { updateUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserProfile, getUserCalendar } from "../../../services/user";
import { getHoursInAWeek } from "../../../services/hours";
import { StackActions, NavigationActions } from "react-navigation";

const HomeContainer = (props) => {
    const [userName, setUserName] = useState("");
    const [userCalendar, setUserCalendar] = useState(null);
    const [hoursInAWeek, setHoursInAWeek] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState("Esta semana");

    useEffect(() => {
        getUserProfileContainer();
        getHoursInAWeekContainer(new Date());
    }, []);

    const refresh = () =>{
        getHoursInAWeekContainer(new Date());
        setSelectedWeek("Esta semana")
    }

    const closeSession = async () =>{
        await AsyncStorage.clear();
        props.updateUser({});
        resetStack();
    }

    const resetStack = () => {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [NavigationActions.navigate({ routeName: "SplashScreen" }), NavigationActions.navigate({ routeName: "Login" })]
        });
        props.navigation.dispatch(resetAction);
    };

    const getUserProfileContainer = async () => {
        const response = await getUserProfile(props.user.token);
        if(!response.error) {
            setUserName(response.name)
            await getUserCalendarContainer(response.userCalendarID)
        }
    }

    const getUserCalendarContainer = async (userCalendarID) => {
        const response = await getUserCalendar(props.user.token, userCalendarID);
        if(!response.error) setUserCalendar(response.schedule)
    }

    const getHoursInAWeekContainer = async (date) => {
        const response = await getHoursInAWeek(props.user.token, date, props.user.userId);
        if(!response.error) setHoursInAWeek(response)
    }
    
    return <Home 
        {...props} 
        userName={userName} 
        userCalendar={userCalendar} 
        hoursInAWeek={hoursInAWeek} 
        getHoursInAWeekContainer={getHoursInAWeekContainer} 
        refresh={refresh}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        closeSession={closeSession}
        />;
};
const mapStateToProps = (store) => ({
    user: store.userReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
