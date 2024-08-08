import { StyleValue } from "vue";

import { CalendarEventModel } from "../models/CalendarEventModel";
import { useZoomStore } from "../stores/DisplayZoomStore";

function calcTimestapFullscreenExpansion(): number {
    const timestamps = document.getElementsByClassName('timestamp');

    if (timestamps.length === 0) {
        console.error('no timestamps found');
        return 0;
    }

    const timestamp = timestamps[0] as HTMLDivElement;

    console.log(timestamp.getBoundingClientRect().width)

    console.log("INDIVIDUAL TIMESTAMP: " + window.getComputedStyle(timestamp).width);
    return Number.parseFloat(window.getComputedStyle(timestamp).width);
}

function expectedTimemapWidth(): number {
    const numberOfBoxes = 25;

    const eachTimestampGrewBy = calcTimestapFullscreenExpansion();

    const totalExpansion = eachTimestampGrewBy * numberOfBoxes;

    return actualTimemapWidth() - totalExpansion;
}

function actualTimemapWidth(): number {
    const timemaps = document.getElementsByClassName('time-map');

    if (timemaps.length === 0) {
        console.error('no timemaps found');
        return 0;
    }

    const timemap = timemaps[0] as HTMLDivElement;

    return timemap.scrollWidth;
}

export function calcEventLeftAlignment(event: CalendarEventModel): string {
    const eventStartTime = event.startTime.getHours();

    const zoom = useZoomStore().zoom;

    console.log("actual: "+ actualTimemapWidth())
    console.log("expected: "+ expectedTimemapWidth())
    const lowZoomMultiplier = actualTimemapWidth() / expectedTimemapWidth();
    console.log("multiplier: "+ lowZoomMultiplier)

    const leftOffsetRem = eventStartTime * zoom * 2 * lowZoomMultiplier;
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
