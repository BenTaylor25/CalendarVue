
/**
 * yyyy-mm-ddThh:mm
 */
export function dateToString(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    // JavaScript dates are stupid, month (and nothing else) is 0-based.
    const month = date.getMonth();
    const monthWithOffset = (month + 1).toString().padStart(2, '0');

    const formatted =
        `${year}-${monthWithOffset}-${day}T${hour}:${minute}`;

    return formatted;
}
