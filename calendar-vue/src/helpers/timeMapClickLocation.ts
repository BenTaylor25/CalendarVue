const HOUR_INCREMENT = 0.5;

export function detectTimeMapClickLocation(
    untimedDate: Date,
    clickPosition: number
): Date | null {
    const bodyDOM = document.querySelector('body');
    const timeMapDivs = document.getElementsByClassName('time-map');
    const timestampDivs = document.getElementsByClassName('timestamp');

    //#region Error Handling
    if (
        bodyDOM === null ||
        timeMapDivs === undefined ||
        timeMapDivs.length === 0 ||
        timestampDivs === undefined ||
        timestampDivs.length === 0
    ) {
        return null;
    }
    //#endregion

    const bodyWidth = bodyDOM.clientWidth;
    const timeMapWidth = timeMapDivs.item(0)?.clientWidth;
    const timeMapScrollWidth = timeMapDivs.item(0)?.scrollWidth;
    const scrollProgress = timeMapDivs.item(0)?.scrollLeft;
    const oneHourWidth = timestampDivs.item(0)?.scrollWidth;

    //#region Error Handling
    if (
        timeMapWidth === undefined ||
        timeMapScrollWidth === undefined ||
        scrollProgress === undefined ||
        oneHourWidth === undefined
    ) {
        return null;
    }
    //#endregion

    const timeMapLeftOffset = bodyWidth - timeMapWidth;
    const clickTimeMapPosition = clickPosition - timeMapLeftOffset;
    const clickTimeMapPositionWithScroll =
        clickTimeMapPosition + scrollProgress;

    const hours = clickTimeMapPositionWithScroll / oneHourWidth;
    const roundedHours = roundHours(hours);

    const startTime = timeFromHours(untimedDate, roundedHours);

    return startTime;
}

function roundHours(hours: number): number {
    return Math.round(hours / HOUR_INCREMENT) * HOUR_INCREMENT;
}

function timeFromHours(untimedDate: Date, hours: number): Date {
    const year = untimedDate.getFullYear();
    const month = untimedDate.getMonth();
    const date = untimedDate.getDate();

    const fullHours = Math.floor(hours);

    const minutes = (hours - fullHours) * 60;
    const fullMinutes = Math.round(minutes);

    const time = new Date(year, month, date, fullHours, fullMinutes, 0, 0);

    return time;
}
