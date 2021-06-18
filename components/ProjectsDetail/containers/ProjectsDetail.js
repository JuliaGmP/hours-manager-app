import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";
import ProjectsDetailComponent from "../components/ProjectsDetailComponent";
import { updateUser } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getProject} from "../../../services/projects"

const ProjectsDetail = (props) => {
    const [day, setDay] = useState();

    useEffect(() => {
        getProjectsNames()
    }, []);

    const getProjectsNames = async () =>{
        const dayCopy = props.navigation.state.params.day
        for(const item of dayCopy) {
            item.projectName= (await getProject(item.idProject)).name
        }
        setDay(dayCopy)
    }

    return <ProjectsDetailComponent {...props} day={day} refresh={props.navigation.state.params.refresh}/>;
};
const mapStateToProps = (store) => ({
    user: store.userReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDetail);