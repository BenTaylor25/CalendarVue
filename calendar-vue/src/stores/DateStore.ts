import { defineStore } from "pinia";

import { getMondayThisWeek } from "../helpers/dateCalculator";

export const useDateStore = defineStore('dates', {
    state: () => ({
        topOfScreenDate: getMondayThisWeek()
    }),
    getters: {
        visibleDays(state) {
            const days = [state.topOfScreenDate];

            for (let _ = 0; _ < 6; _++) {
                const previousDay = days[days.length - 1];

                const newDay = new Date();
                newDay.setDate(previousDay.getDate() + 1);

                days.push(newDay);
            }

            return days;
        }
    },
    actions: {
        scrollUp() {
            const newTopOfScreenDay = new Date();
            newTopOfScreenDay.setDate(this.topOfScreenDate.getDate() - 1);
            console.log(newTopOfScreenDay)

            this.topOfScreenDate = newTopOfScreenDay;
        },
        scrollDown() {
            const newTopOfScreenDay = new Date();
            newTopOfScreenDay.setDate(this.topOfScreenDate.getDate() + 1);
            console.log(newTopOfScreenDay)

            this.topOfScreenDate = newTopOfScreenDay;
        }
    }
});
