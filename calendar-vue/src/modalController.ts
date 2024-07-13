
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
const showModalShadow = () => { showElementWithId('modal-shadow'); }
const hideModalShadow = () => { hideElementWithId('modal-shadow'); }


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
export const showZoomSettingsModal = () => { showModalWithId('zoom-settings-modal'); }
export const hideZoomSettingsModal = () => { hideModalWithId('zoom-settings-modal'); }


const allModalIds = [
    "zoom-settings-modal"
];

export function hideAllModals() {
    hideModalShadow();

    for (const modalId of allModalIds) {
        hideElementWithId(modalId);
    }
}