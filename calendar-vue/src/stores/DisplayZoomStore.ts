import { defineStore } from "pinia";

import { DEFAULT_CALENDAR_ZOOM } from "../constants/settingsConstants.ts";

export const useZoomStore = defineStore('zoom', {
    state: () => ({
        zoom: DEFAULT_CALENDAR_ZOOM
    })
});
