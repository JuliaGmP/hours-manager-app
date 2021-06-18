import { endpoints } from "./endpoints";
import customFetch from "./fetch";

export async function login(email, password) {
    let credentials;
    if(email.includes("@"))
        credentials = { email: email, password: password };
    else 
        credentials= { ID: email, password: password}
    const response = await customFetch(endpoints.user_login, "POST", credentials, null);
    return response;
}
