import { defineStore } from "pinia";
import { CalendarEventModel } from "../models/CalendarEventModel";

export const useEventStore = defineStore('events', {
    state: () => ({
        events: [
            new CalendarEventModel(
                "test",
                new Date(2024, 7, 16, 10, 0, 0),
                new Date(2024, 7, 16, 11, 0, 0)
            )
        ] as CalendarEventModel[]
    })
});
