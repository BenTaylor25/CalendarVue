import { defineStore } from "pinia";

export type GetStartTimeResult = {
    isKnown: boolean,
    time: Date | null
};

const useNewEventStartTimePrivateStore =
    defineStore('newEventStartTimePrivate', {
    state: () => ({
        startTimeKnown: false,
        time: null as Date | null
    })
})

export const useNewEventStartTimeStore =
    defineStore('newEventStartTime', {
    actions: {
        setStartTime(startTime: Date) {
            const priv = useNewEventStartTimePrivateStore();

            priv.startTimeKnown = true;
            priv.time = startTime;
        },
        getStartTime(): GetStartTimeResult {
            const priv = useNewEventStartTimePrivateStore();

            const result = {
                isKnown: priv.startTimeKnown,
                time: priv.time
            } as GetStartTimeResult;

            priv.startTimeKnown = false;
            priv.time = null;

            return result;
        }
    }
});
