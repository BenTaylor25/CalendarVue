
/**
 * Returns Rem -> Px conversion constant:
 * - `const px = rem * remToPx();`
 */
export function remToPx(): number {

    //#region Error Handling
    if (typeof getComputedStyle === "undefined") {
        console.error(
            "Could not find function 'getComputedStyle'. " +
            "Browser likely out of date."
        );
    }

    if (document?.documentElement === undefined) {
        console.error(
            "`document` or 'document.documentElement' was undefined."
        );
    }
    //#endregion

    const fontSizeString =
        getComputedStyle(document.documentElement).fontSize;
    const fontSize = parseFloat(fontSizeString);

    //#region Error Hanlding
    if (isNaN(fontSize)) {
        console.error(
            `Rem font size '${fontSizeString}' is not a number.`
        );
    }
    //#endregion

    return fontSize;
}
