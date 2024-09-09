import { API_CALENDAR_EVENT_ROUTE, JSON_HEADERS, NOT_SYNCED } from "../../constants/api.ts";
import { CalendarEventModel } from "../../models/CalendarEventModel.ts";

interface UpdateBody {
    name: string,
    startDateTime: string,
    endDateTime: string
}

export async function apiUpdateEvent(calendarEvent: CalendarEventModel) {
    //#region Error Handling
    if (calendarEvent === null || calendarEvent.serverId === NOT_SYNCED) {
        console.error("Attempted to update invalid event.");
    }
    //#endregion

    const route = `${API_CALENDAR_EVENT_ROUTE}/${calendarEvent.serverId}`;

    const body = {
        name: calendarEvent.name,
        startDateTime: calendarEvent.startTime.toISOString(),
        endDateTime: calendarEvent.endTime.toISOString()
    } as UpdateBody;

    await fetch(route, {
        method: "PUT",
        headers: JSON_HEADERS,
        body: JSON.stringify(body)
    })
    .catch(err => {
        console.error("Update event request failed: " + err);
    })
}
