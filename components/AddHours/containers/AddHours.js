import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";
import AddHoursComponent from "../components/AddHoursComponent";
import { updateUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHours } from "../../../services/hours";
import { getClients} from "../../../services/clients"
import { getProjects} from "../../../services/projects"

const AddHours = (props) => {
    const [projects, setProjects] = useState(null);
    const [dayHoursToEdit, setDayHoursToEdit] = useState(null);

    useEffect(() => {
        getAllClients();
        editHours()
    }, []);

    const editHours = () =>{
        if(props.navigation.state.params.day) setDayHoursToEdit(props.navigation.state.params.day)
    }

    const submitHours = async (idProject, hours, date) =>{
        try {
            const response = await addHours(props.user.userId, date, hours, idProject, props.user.token)
            if(response.error) throw new Error()
            props.navigation.navigate("AddHoursSuccess", { hours: hours, refresh : props.navigation.state.params.refresh, editDayText: props.navigation.state.params.day? true: false });
        } catch (error) {
            console.log(error);
        } 
    }

    const getAllClients = async () => {
        try{
            const response = await getClients(props.user.token);
            if(response.error) throw new Error('Error');
            const projects = await getProjectsByClients(response)
            setProjects(projects)
        }
        catch(e){
            console.log('error', e);
            return;
        }
    }

    const getProjectsByClients = async (clients) =>{
        try{
            const response = await getProjects(clients, props.user.token);
            return response;
        }
        catch(e){
            console.log('error', e);
            return;
        }
    }

    return <AddHoursComponent {...props} submitHours={submitHours} projects={projects} dayHoursToEdit={dayHoursToEdit}/>;
};
const mapStateToProps = (store) => ({
    user: store.userReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddHours);