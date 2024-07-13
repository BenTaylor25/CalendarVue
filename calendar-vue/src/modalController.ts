
export function showModalShadow() {
    const shadowDiv = document.getElementById('modal-shadow');

    //#region Error Handling
    if (shadowDiv === null) {
        console.error("Failed to showModalShadow(); could not find element with id 'modal-shadow'.");
    }
    //#endregion

    shadowDiv?.classList.add('show');
}

export function hideModalShadow() {
    const shadowDiv = document.getElementById('modal-shadow');

    //#region Error Handling
    if (shadowDiv == null) {
        console.error("Failed to hideModalShadow(); could not find element with id 'modal-shadow'.");
    }
    //#endregion

    shadowDiv?.classList.remove('show');
}
