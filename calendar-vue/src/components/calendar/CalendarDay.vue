<script setup lang="ts">
import { onMounted } from 'vue';

import CalendarEvent from './CalendarEvent.vue';

import { useEventStore } from '../../stores/CalendarStore';
import { daysOfWeek } from './CalendarMain.vue';
import { CalendarEventModel } from '../../models/CalendarEventModel';
import { useZoomStore } from '../../stores/DisplayZoomStore';

const times: string[] = [""];

for (let i = 1; i <= 24; i++) {
  times.push(`${i}:00`);
}

onMounted(() => {
  setZoomOnCalendarDay();
});

</script>

<template>
  <div class="calendar-day">

    <div class="weekday">
      <p>{{ weekday }}</p>
    </div>

    <div class="time-map">
      <span v-for="_ in times" class="timestamp"></span>

      <div class="event-holder">
        <calendar-event
          v-for="calendarEventModel of getTodaysEvents()"
          :calendarEventModel="calendarEventModel"
        />
      </div>
    </div>
    

  </div>
</template>

<script lang="ts">
export default {
  props: {
    weekday: String
  },
  methods: {
    getTodaysEvents(): CalendarEventModel[] {
      // THIS FILTER IS WRONG; REQUIRES PROPER IMPLEMENTATION.
      return (useEventStore().events as CalendarEventModel[]).filter(event => {
        const isInvalid = !this.weekday ||
          !daysOfWeek.includes(this.weekday);
        if (isInvalid) {
          return false;
        }

        const dayMatches = event.startTime.getDate() % 7 == daysOfWeek.indexOf(this.weekday);

        return dayMatches;
      });
    }
  }
}

export function setZoomOnCalendarDay() {
  const zoom = useZoomStore().zoom;

  const calendarDayDivs = document.getElementsByClassName('calendar-day');

  //#region Error Handling
  if (calendarDayDivs.length === 0) {
    console.error("Failed to find CalendarDay.");
  }
  //#endregion

  for (const calendarDayDiv of calendarDayDivs) {
    const timestampDivs = calendarDayDiv.getElementsByClassName('timestamp');

    //#region Error Handling
    if (timestampDivs.length === 0) {
      console.error("No timestamps registered on CalendarDay.");
    }
    //#endregion

    for (const timestampDiv of timestampDivs) {
      (timestampDiv as HTMLDivElement).style.padding = `0 ${zoom}rem`;
    }
  }
}
</script>

<style scoped lang="scss">
.calendar-day {
  display: flex;
  border: 1px solid green;
  height: 12.5%;

  .weekday {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: min(10%, 10rem);

    background-color: blueviolet; // temp

    p {
      font-size: 1.25rem;
    }
  }

  .time-map {
    position: relative;
    display: flex;
    width: max(90%, calc(100% - 10rem));
    overflow-x: hidden;

    .timestamp {
      width: 5rem;

      &:not(:last-of-type) {
        border-right: 1px solid gold;
      }
    }

    .event-holder {
      position: absolute;
      width: 100%;
      height: 100%
    }
  }
}
</style>
