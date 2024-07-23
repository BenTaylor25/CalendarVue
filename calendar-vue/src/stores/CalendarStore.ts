import { defineStore } from "pinia";
import { CalendarEventModel } from "../models/CalendarEventModel";

export const useEventStore = defineStore('events', {
    state: () => ({
        events: [
            new CalendarEventModel(
                "monday test",
                new Date(2024, 7, 7, 10, 0, 0, 0),
                new Date(2024, 7, 7, 12, 0, 0, 0)
            ),
            new CalendarEventModel(
                "wednesday test",
                new Date(2024, 7, 2, 12, 0, 0, 0),
                new Date(202, 0, 0, 0)
            )
        ] as CalendarEventModel[]
    })
});