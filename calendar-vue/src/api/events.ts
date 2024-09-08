import { API_CALENDAR_EVENT_ROUTE } from "../constants/api.ts";

export async function apiGetAllCalendarEvents() {
    await fetch(API_CALENDAR_EVENT_ROUTE)
        .then(res => {
            return res.json();
        })
        .then(body => {
            console.log(body);
        })
        .catch(err => {
            console.error(`Could not reach server; ${err}`);
        });
}
