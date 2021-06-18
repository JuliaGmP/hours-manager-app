import { endpoints } from "./endpoints";
import customFetch from "./fetch";

export async function getBasicUserInfo(token) {
    let response = await customFetch(endpoints.user_me, "GET", null, null, token);
    return response;
}

export async function getUserProfile(token) {
    let response = await customFetch(endpoints.user_me_user_profile, "GET", null, null, token);
    return response;
}

export async function getUserCalendar(token, id) {
    let response = await customFetch(endpoints.user_calendar_get + '/' + id, "GET", null, null, token);
    return response;
}
