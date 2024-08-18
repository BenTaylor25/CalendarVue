import { refreshModal } from "./components/modals/NewEventModal.vue";
import { MODAL_IDS } from "./constants/modalConstants";

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

export function hideAllModals() {
    for (const modalId of Object.values(MODAL_IDS)) {
        hideElementWithId(modalId);
    }
}


// INDIVIDUAL MODALS
// -----------------

// Zoom Settings.
export const showZoomSettingsModal = () => {
    showElementWithId(MODAL_IDS.ZOOM_SETTINGS_MODAL);
}

export const hideZoomSettingsModal = () => {
    hideElementWithId(MODAL_IDS.ZOOM_SETTINGS_MODAL);
}

// New Event.
export const showNewEventModal = () => {
    showElementWithId(MODAL_IDS.NEW_EVENT_MODAL);
    refreshModal();
}

export const hideNewEventModal = () => {
    hideElementWithId(MODAL_IDS.NEW_EVENT_MODAL);
}
