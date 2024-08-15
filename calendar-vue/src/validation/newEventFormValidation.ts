
export function newEventFormIsValid(
    name: string,
    startTimeStr: string,
    endTimeStr: string
): boolean {

    const nameIsValid =
        name !== undefined &&
        name !== '';

    const startTime = dateFromFormatString(startTimeStr);
    const endTime = dateFromFormatString(endTimeStr);

    const startAndEndDateTimesAreValid =
        startTime !== null &&
        endTime !== null &&
        startTime < endTime;

    const eventIsValid =
        nameIsValid &&
        startAndEndDateTimesAreValid;

    return eventIsValid;
}

export function dateFromFormatString(formatStr: string): Date | null {
    const timestamp = Date.parse(formatStr);

    // Timestamps will be NaN if timeStr is invalid.
    if (isNaN(timestamp)) {
        return null;
    }

    return new Date(timestamp);
}
