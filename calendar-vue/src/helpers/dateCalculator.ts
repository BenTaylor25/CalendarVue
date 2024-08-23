
export function getMondayThisWeek(): Date {
    const today = new Date();

    // 0: Sunday
    // 1: Monday
    // ...
    const weekdayIdx = today.getDay();

    let offset = 1 - weekdayIdx;

    if (weekdayIdx === 0) {
        offset = -6;
    }

    const monday = new Date();
    monday.setDate(today.getDate() + offset);

    return monday;
}

export const daysOfWeek = [
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

    return daysOfWeek[day];
}

export function getShortDateStr(date: Date) {
    // JavaScript months (and months only) are 0-indexed.
    const month = date.getMonth() + 1;

    return `${date.getDate()}/${month}/${date.getFullYear()}`;
}
