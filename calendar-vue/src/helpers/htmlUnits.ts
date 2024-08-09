
/**
 * Returns Rem -> Px conversion constant:
 * - `const px = rem * remToPx();`
 */
export function remToPx(): number {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
