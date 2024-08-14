
export function newEventFormIsValid(
    name: string,
    startTimeStr: string,
    endTimeStr: string
): boolean {

    const nameIsValid =
        name !== undefined &&
        name !== '';

    // Timestamps will be NaN if timeStr is invalid.
    const startTimeTimestamp = Date.parse(startTimeStr);
    const endTimeTimestamp = Date.parse(endTimeStr);

    const startAndEndDateTimesAreValid =
        !isNaN(startTimeTimestamp) &&
        !isNaN(endTimeTimestamp) &&
        startTimeBeforeEndTime(
            new Date(startTimeTimestamp),
            new Date(endTimeTimestamp)
        );

    const eventIsValid =
        nameIsValid &&
        startAndEndDateTimesAreValid;

    return eventIsValid;
}

function startTimeBeforeEndTime(
    startTime: Date,
    endTime: Date
): boolean {
    return startTime < endTime;
}
