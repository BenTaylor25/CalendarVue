
export type NewEventFormValidationResult = {
    success: boolean,
    errorMessage: string
}

export function newEventFormIsValid(
    name: string,
    startTimeStr: string,
    endTimeStr: string
): NewEventFormValidationResult {
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

    return {
        success: eventIsValid,
        errorMessage: generateErrorMessage(
            eventIsValid,
            nameIsValid,
            startTime,
            endTime
        )
    };
}

export function dateFromFormatString(formatStr: string): Date | null {
    const timestamp = Date.parse(formatStr);

    // Timestamp will be NaN if timeStr is invalid.
    if (isNaN(timestamp)) {
        return null;
    }

    return new Date(timestamp);
}

function generateErrorMessage(
    eventIsValid: boolean,
    nameIsValid: boolean,
    startTime: Date | null,
    endTime: Date | null
): string {
    if (eventIsValid) {
        return '';
    }

    let errorMessage = '';

    if (!nameIsValid) {
        errorMessage += 'Name invalid. ';
    }

    if (!startTime) {
        errorMessage += 'Start time invalid. ';
    }

    if (!endTime) {
        errorMessage += 'End time invalid. ';
    }

    if (startTime && endTime && startTime >= endTime) {
        errorMessage += 'End time is before start time. ';
    }

    return errorMessage;
}
