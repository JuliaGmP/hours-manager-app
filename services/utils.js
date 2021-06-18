
import moment from 'moment';

export function dateFormatter() {
    const date = new Date();
        return (
            getDayString(date) + " " + date.getUTCDate() + " de " + getMonthString(date) +","+ " " + date.getFullYear()
        )
}

export function getDayString(date) {
    let days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return days[date.getDay()];
}

export function getDayStringByNumber(number) {
    let days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return days[number];
}

function getMonthString(date) {
    let days = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre','Octubre' ,'Noviembre', 'Diciembre'];
    return days[date.getUTCMonth()];
}

export function getTotalHoursInADay(hoursObjectsArray) {
    let totalHours = 0;
    hoursObjectsArray.map((hoursObjetc)=>{
        totalHours += hoursObjetc.number_hours;
    })
    return formatHour(totalHours)
}

export function formatHour(value) {
    value = Math.round((value + Number.EPSILON) * 100) / 100
    var hours = Math.floor(value);
    var minutes = Math.round((Math.abs(value) * 60) % 60);
    return hours.toString() + ":" + (minutes.toString().length === 1 ? "0" + minutes.toString() : minutes.toString())
}

export function formatHourString(value) {
    var hours = Math.floor(value);
    var minutes = value % 60;
    return hours.toString() + "h " + (minutes.toString().length === 1 ? minutes.toString() + "0" : minutes.toString())+"min"
}

export function formatHourNumber(value) {
    if(isNaN(Number(value))) {
        const number = value.split(":")
        return Math.round((Number(number[0]) + Number(number[1]/60) + Number.EPSILON) * 100) / 100
    }
    else return value
}
