import { StyleValue } from "vue";

import { CalendarEventModel } from "../models/CalendarEventModel";
import { useZoomStore } from "../stores/DisplayZoomStore";

export function calcEventLeftAlignment(event: CalendarEventModel): string {
    const eventStartTime = event.startTime.getHours();

    const zoom = useZoomStore().zoom;

    const leftOffsetRem = eventStartTime * zoom * 2;
    const leftOffsetPx = eventStartTime;

    return `calc(${leftOffsetRem}rem + ${leftOffsetPx}px)`;
}

export function calcEventWidth(event: CalendarEventModel): string {
    const eventDuration = event.endTime.getHours() - event.startTime.getHours();   // doesn't handle multi-day events

    const zoom = useZoomStore().zoom;

    const widthRem = eventDuration * zoom * 2;
    const widthPx = eventDuration;

    return `calc(${widthRem}rem + ${widthPx}px)`;
}

export function calcEventStyle(event: CalendarEventModel): StyleValue {
    return {
        left: calcEventLeftAlignment(event),
        width: calcEventWidth(event)
    } as StyleValue;
}