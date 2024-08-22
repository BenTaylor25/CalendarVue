import { defineStore } from "pinia";

import { CalendarEventModel } from "../models/CalendarEventModel";

export const useEventStore = defineStore('events', {
    state: () => ({
        events: [
            new CalendarEventModel(
                "monday test",
                // This is 7th AUGUST because JavaScript is stupid.
                new Date(2024, 7, 7, 10, 0, 0, 0),
                new Date(2024, 7, 7, 12, 0, 0, 0)
            ),
            new CalendarEventModel(
                "wednesday test",
                new Date(2024, 7, 2, 12, 0, 0, 0),
                new Date(2024, 7, 2, 16, 0, 0, 0)
            )
        ] as CalendarEventModel[],
        selectedEvent: null as CalendarEventModel | null
    }),
    actions: {
        addEvent(newEvent: CalendarEventModel) {
            this.events.push(newEvent);
        },
        deleteSelectedEvent() {
            //#region Error Handling
            if (!this.selectedEvent) {
                return;
            }
            //#endregion

            const idx = this.events.indexOf(this.selectedEvent);

            //#region Error Handling
            if (idx === -1) {
                return;
            }
            //#endregion

            this.events.splice(idx, 1);
        }
    }
});
