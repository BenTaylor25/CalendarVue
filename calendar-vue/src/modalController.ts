import { MODAL_SHADOW_ID, MODAL_IDS } from "./constants/modalConstants";

function showElementWithId(id: string) {
    const element = document.getElementById(id);

    //#region Error Handling
    if (element == null) {
        console.error(`Could not find element with id '${id}'.`);
    }
    //#endregion

    element?.classList.add('show');
}

function hideElementWithId(id: string) {
    const element = document.getElementById(id);

    //#region Error Handling
    if (element == null) {
        console.error(`Could not find element with id '${id}'.`);
    }
    //#endregion

    element?.classList.remove('show');
}


// Modal Shadow.
const showModalShadow = () => { showElementWithId(MODAL_SHADOW_ID); }
const hideModalShadow = () => { hideElementWithId(MODAL_SHADOW_ID); }


export function hideAllModals() {
    hideModalShadow();

    for (const modalId of Object.values(MODAL_IDS)) {
        hideElementWithId(modalId);
    }
}


function showModalWithId(id: string) {
    showModalShadow();
    showElementWithId(id);
}

function hideModalWithId(id: string) {
    // Edgecase: if multiple modals are open, closing one will remove the background from all.
    // Shouldn't be a problem for this project.
    hideModalShadow();
    hideElementWithId(id);
}


// Zoom Settings
export const showZoomSettingsModal = () => { showModalWithId(MODAL_IDS.ZOOM_SETTINGS_MODAL); }
export const hideZoomSettingsModal = () => { hideModalWithId(MODAL_IDS.ZOOM_SETTINGS_MODAL); }
