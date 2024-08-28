import { useDateStore } from "../stores/DateStore.ts";
import {
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getMondayOfWeek
} from "./dateCalculator.ts";

/*
Using the topOfScreenDate from the DateStore, I want to get an array
representing weeks of the year. Each week should have 7 values.

The second to the second-last entry to the weeks array should represent
the days in the month of topOfScreenDate.
If the first of the month is not a Monday, weeks[1] should be left-padded
with nulls so that everything matches up. Then weeks[0] should be
right-padded with 7-n nulls to align.
e.g. 1st of the month is Thursday:
weeks = [
    [ Date, Date, Date, null, null, null, null ],
    [ null, null, null, Date, Date, Date, Date ],
    [ Date, Date, Date, Date, Date, Date, Date ],
    ...
];

The same should be true of the end of the month and the start of the next.

When the first of the month is a Monday, the first two entries in week
should both be full of dates. The same applies when the end of the month
is a Sunday.
You will only have no null values when topOfScreenDate is during a
non-leap-year February, where the 1st is a Monday. e.g. Feb 2027.
This month will also cause weeks to only have 6 entries where usually
it would have 7.
*/

export function getMonthViewDates() {
    const dateStore = useDateStore();
    const topOfScreenDate = dateStore.topOfScreenDate;

    const prevMonthWeek = getPrevMonthWeek(topOfScreenDate);
    const thisMonthWeeks = getThisMonthWeeks(topOfScreenDate);
    const nextMonthWeek = getNextMonthWeek(topOfScreenDate);

    const weeks = [
        prevMonthWeek,
        ...thisMonthWeeks,
        nextMonthWeek
    ] as Date[][];

    return weeks;
}

function getThisMonthWeeks(startingDate: Date): Array<Array<Date | null>> {
    const weeks = [] as Array<Array<Date | null>>;

    // First week - might not start on Monday.
    const firstOfMonth = getFirstDayOfMonth(startingDate);

    const firstWeek = getDaysThisWeek(firstOfMonth.date, {
        sameMonthOnly: true,
        shouldPad: true,
        padRight: false
    });

    weeks.push(firstWeek);

    // Remaining weeks - will always start on Monday.
    const EighthOfMonth = new Date(firstOfMonth.date);
    EighthOfMonth.setDate(EighthOfMonth.getDate() + 7);
    const mondayOfSecondWeek = getMondayOfWeek(EighthOfMonth);

    let weekStart = mondayOfSecondWeek;

    while (weekStart.getMonth() === startingDate.getMonth()) {
        const week = getDaysThisWeek(weekStart, {
            sameMonthOnly: true,
            shouldPad: true,
            padRight: true
        });

        weeks.push(week);

        weekStart.setDate(weekStart.getDate() + 7);
    }

    return weeks;
}

function getPrevMonthWeek(startingDate: Date): Array<Date | null> {
    const dayLastMonth = new Date(
        startingDate.getFullYear(),
        startingDate.getMonth() - 1,
        15
    );

    const lastDayLastMonth = getLastDayOfMonth(dayLastMonth);

    const week = getDaysThisWeek(lastDayLastMonth.date, {
        sameMonthOnly: true,
        shouldPad: true,
        padRight: true
    })

    return week;
}

function getNextMonthWeek(startingDate: Date): Array<Date | null> {
    const firstDayNextMonth = new Date(
        startingDate.getFullYear(),
        startingDate.getMonth() + 1,
        1
    );

    const week = getDaysThisWeek(firstDayNextMonth, {
        sameMonthOnly: true,
        shouldPad: true,
        padRight: false
    });

    return week;
}

interface GetDaysThisWeekSettings {
    sameMonthOnly: boolean,
    shouldPad: boolean,
    padRight: boolean
}

function getDaysThisWeek(
    startingDate: Date,
    settings: GetDaysThisWeekSettings = {
        sameMonthOnly: false,
        shouldPad: false,
        padRight: false
    }
): Array<Date | null> {
    const days = [] as Array<Date | null>;

    let day = getMondayOfWeek(startingDate);

    for (let _ = 0; _ < 7; _++) {
        const shouldIncludeDay =
            !settings.sameMonthOnly ||
            startingDate.getMonth() === day.getMonth();

        if (shouldIncludeDay) {
            days.push(day);
        }

        day = new Date(day);
        day.setDate(day.getDate() + 1);
    }

    if (settings.shouldPad) {
        if (settings.padRight) {
            while (days.length < 7) {
                days.push(null);
            }
        } else {
            while (days.length < 7) {
                days.unshift(null);
            }
        }
    }

    return days;
}
