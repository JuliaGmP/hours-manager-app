import { endpoints } from "./endpoints";
import fetch from "./fetch"

export async function getProjects(clients, token) {
    if(clients && clients.length !== 0){
        const tenantProjects = []
        for (const client of clients){
            const filter ={ where: {idClient: { like: client.id}}}
            let response = await fetch(endpoints.projects+'?filter=' + JSON.stringify(filter), "GET", null, null, token);
            if(response.length !== 0) {
                response.map((project) => tenantProjects.push(project))
            }
        }
        return tenantProjects;
    }
}

export async function addProject(projectData, token) {
    let response = await fetch(endpoints.projects, "POST", projectData, null, token);
    return response;
}

export async function getProject(idProject, token) {
    let response = await fetch(endpoints.projects +"/" + idProject, "GET", null, null, token);
    return response;
}


