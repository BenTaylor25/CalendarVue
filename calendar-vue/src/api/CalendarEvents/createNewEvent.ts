import { API_CALENDAR_EVENT_ROUTE, JSON_POST_HEADERS } from "../../constants/api.ts";
import { CalendarEventModel } from "../../models/CalendarEventModel.ts";

interface CreateBody {
    name: string,
    startDateTime: string,
    endDateTime: string
}

// interface CreateResponse {
//     id: string
// }

export async function apiCreateNewEvent(
    calendarEvent: CalendarEventModel
) {
    const body = {
        name: calendarEvent.name,
        startDateTime: calendarEvent.startTime.toISOString(),
        endDateTime: calendarEvent.endTime.toISOString()
    } as CreateBody;

    console.log(calendarEvent.startTime.toISOString());

    await fetch(API_CALENDAR_EVENT_ROUTE, {
        method: 'POST',
        headers: JSON_POST_HEADERS,
        body: JSON.stringify(body)
    });
}
