import { endpoints } from "./endpoints";
import fetch from "./fetch"

export async function getClients(token) {
    let response = await fetch(endpoints.clients, "GET", null, null, token);
    return response;
}

export async function addClient(clientData, token) {
    let response = await fetch(endpoints.clients, "POST", clientData, null, token);
    return response;
}


