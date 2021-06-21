import { endpoints } from "./endpoints";
import customFetch from "./fetch";
import moment from 'moment';

export async function getHoursInAWeek(token, date, userId) {
    const day = new Date(date)
    let response = await customFetch(endpoints.hours_getWeekHours + "/" + day + "/" + userId, "GET", null, null, token);
    return response;
}

export async function addHours(userId,date,number_hours,idProject, token) {
    const dateMoment = moment(date.toString(),"dddd DD MMM")
    dateMoment.set({hour:12,minute:0,second:0,millisecond:0})
    const data = {
        "userId": userId,
        "date": dateMoment,
        "number_hours": Math.round((number_hours + Number.EPSILON) * 100) / 100 ,
        "idProject": idProject === null ? "" : idProject,
      }
    let response = await customFetch(endpoints.hours_addHours, "POST", data, null, token);

    return response;
}
