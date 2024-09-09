import { API_CALENDAR_EVENT_ROUTE } from "../constants/api.ts";
import { CalendarEventModel } from "../models/CalendarEventModel.ts";

interface ApiEventResponse {
    id: string,
    name: string,
    startDateTime: string,
    endDateTime: string
}

export async function apiGetAllCalendarEvents():
    Promise<CalendarEventModel[]>
{
    const eventsFromApi = [] as CalendarEventModel[];

    await fetch(API_CALENDAR_EVENT_ROUTE)
        .then(res => {
            return res.json();
        })
        .then(body => {
            for (const apiEvent of body as ApiEventResponse[]) {
                const startDateTime = new Date(apiEvent.startDateTime);
                const endDateTime = new Date(apiEvent.endDateTime);

                const eventFromApi = new CalendarEventModel(
                    apiEvent.name,
                    startDateTime,
                    endDateTime
                );
                eventFromApi.serverId = apiEvent.id;

                eventsFromApi.push(eventFromApi);
            }
        })
        .catch(err => {
            console.error(`Could not reach server; ${err}`);
        });

    return eventsFromApi;
}
