
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
