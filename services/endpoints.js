
const BASE_URL = "https://5c560c7ab405.ngrok.io";

const routes = {
    users: "/users",
    userCalendars: "/user-calendars",
    hours: "/hours",
    projects: "/projects",
    clients: "/clients",
};

export const endpoints = {
    //USERS CONTROLLER\\
    user_login: BASE_URL + routes.users + "/login", //post
    user_register: BASE_URL + routes.users + "/register", //post
    user_me: BASE_URL + routes.users + "/me", //get (shows current user(more info))
    user_me_user_profile: BASE_URL + routes.users + "/me/userProfile", //get
    user_calendar_get: BASE_URL + routes.userCalendars, // + /{id}
    hours_getWeekHours: BASE_URL + routes.hours + "/HoursInAWeek", // + /{date}"
    hours_addHours: BASE_URL + routes.hours,
    projects: BASE_URL + routes.projects, // + {id} GET
    clients: BASE_URL + routes.clients, // + {id} GET

};
