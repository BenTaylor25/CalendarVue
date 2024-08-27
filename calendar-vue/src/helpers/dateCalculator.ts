
export function getMondayThisWeek(): Date {
    return getMondayOfWeek(new Date());
}

export function getMondayOfWeek(date: Date): Date {
    // 0: Sunday
    // 1: Monday
    // ...
    // 6: Saturday
    let weekdayIdx = date.getDay();

    // 1: Monday
    // ...
    // 6: Saturday
    // 7: Sunday
    if (weekdayIdx === 0) {
        weekdayIdx = 7;
    }

    const offsetToMonday = 1 - weekdayIdx;

    const monday = new Date(date);
    monday.setDate(date.getDate() + offsetToMonday);

    return monday;
}

const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
];

export function getShortWeekday(date: Date) {
    let day = date.getDay();

    // Shift from Sunday start to Monday start.
    day -= 1;
    if (day < 0) {
        day = 6;
    }

    return WEEKDAYS[day];
}

export function getShortDateStr(date: Date) {
    // JavaScript months (and months only) are 0-indexed.
    const month = date.getMonth() + 1;

    return `${date.getDate()}/${month}/${date.getFullYear()}`;
}

export interface WeekdayAndDate {
    weekday: string,
    weekdayIdx: number,
    date: Date
}

export function getFirstDayOfMonth(month: Date): WeekdayAndDate {
    const firstDateOfMonth = new Date(month);
    firstDateOfMonth.setDate(1);

    const weekday = getShortWeekday(firstDateOfMonth);

    return {
        weekday,
        weekdayIdx: WEEKDAYS.indexOf(weekday),
        date: firstDateOfMonth
    }
}
