
/**
 * yyyy-mm-ddThh:mm
 */
export function dateToString(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const formatted = `${year}-${month}-${day}T${hour}:${minute}`;

    return formatted;
}
