import { StyleValue } from "vue";

import { CalendarEventModel } from "../models/CalendarEventModel";
import { useZoomStore } from "../stores/DisplayZoomStore";
import { remToPx } from "./htmlUnits";

/**
 * Using the size of each hour, calculate how
 * wide the calendar time area should be.
 *
 * The actual width will usually be smaller,
 * but that's okay because it'll have a
 * horizontal scroll bar.
 * In the case that the actual width is
 * greater than the expected width
 * (i.e. when the zoom is very small)
 * the Calendar Events will need to be scaled
 * accordingly because the time bar is set
 * to stretch to size if it's too small.
 */
function expectedTimeBarWidthPx(): number {
    const numberOfBoxes = 25;
    const zoom = useZoomStore().zoom;

    const expectedWidthPx = numberOfBoxes * 2 * zoom * remToPx();
    return expectedWidthPx
}

/**
 * Look at the time bar to see what this width
 * actually is.
 */
function actualTimeBarWidthPx(): number {
    const timeBar = document.getElementById('time-bar');

    if (timeBar) {
        return timeBar.offsetWidth;
    } else {
        console.warn("Couldn't find time-bar.");
        return 0;
    }
}

function smallZoomScaleMultiplier(): number {
    const actual = actualTimeBarWidthPx();
    const expected = expectedTimeBarWidthPx();

    let multiplier = 1;

    if (actual > expected) {
        multiplier = actual / expected;
    }

    return multiplier
}

export function calcEventLeftAlignment(event: CalendarEventModel): string {
    const eventStartTime = hoursWithDecimalMinutes(event.startTime);

    const zoom = useZoomStore().zoom;

    const leftOffsetRem =
        eventStartTime * zoom * 2 * smallZoomScaleMultiplier();
    let leftOffsetPx = eventStartTime;

    if (smallZoomScaleMultiplier() !== 1) {
        leftOffsetPx = 0;
    }

    return `calc(${leftOffsetRem}rem + ${leftOffsetPx}px)`;
}

export function calcEventWidth(event: CalendarEventModel): string {
    const eventDuration =
        hoursWithDecimalMinutes(event.endTime) -
        hoursWithDecimalMinutes(event.startTime);
        // doesn't handle multi-day events

    const zoom = useZoomStore().zoom;

    const widthRem = eventDuration * zoom * 2 * smallZoomScaleMultiplier();
    let widthPx = eventDuration;

    if (smallZoomScaleMultiplier() !== 1) {
        widthPx = 0;
    }

    return `calc(${widthRem}rem + ${widthPx}px)`;
}

export function calcEventStyle(event: CalendarEventModel): StyleValue {
    return {
        left: calcEventLeftAlignment(event),
        width: calcEventWidth(event)
    } as StyleValue;
}

function hoursWithDecimalMinutes(date: Date): number {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const minutesRounded = Math.round(minutes / 15) * 15;

    return hours + (minutesRounded / 60);
}
