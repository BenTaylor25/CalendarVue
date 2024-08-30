import { MODAL_IDS } from "./constants/modalConstants.ts";

import {
    refreshNewEventModal
} from "./components/modals/NewEventModal.vue";
import {
    refreshEditEventModal
} from "./components/modals/EditEventModal.vue";

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
    refreshNewEventModal();
}

export const hideNewEventModal = () => {
    hideElementWithId(MODAL_IDS.NEW_EVENT_MODAL);
}

// Edit Event.
export const showEditEventModal = () => {
    showElementWithId(MODAL_IDS.EDIT_EVENT_MODAL);
    refreshEditEventModal();
}

export const hideEditEventModal = () => {
    hideElementWithId(MODAL_IDS.EDIT_EVENT_MODAL);
}

// Year View.
export const showYearViewModal = () => {
    showElementWithId(MODAL_IDS.YEAR_VIEW_MODAL);
    refreshEditEventModal();
}

export const hideYearViewModal = () => {
    hideElementWithId(MODAL_IDS.YEAR_VIEW_MODAL);
}
