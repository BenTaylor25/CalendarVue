<script setup lang="ts">
import { onMounted } from 'vue';

import { CalendarEventModel } from '../../models/CalendarEventModel.ts';
import { showNewEventModal } from '../../modalController.ts';
import {
  detectTimeMapClickLocation
} from '../../helpers/timeMapClickLocation.ts';
import {
  getShortWeekday,
  getShortDateStr
} from '../../helpers/dateCalculator.ts';
import { useEventStore } from '../../stores/CalendarStore.ts';
import { useZoomStore } from '../../stores/DisplayZoomStore.ts';
import {
  useNewEventStartTimeStore
} from '../../stores/NewEventStartTime.ts';

import CalendarEvent from './CalendarEvent.vue';

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
      <p class="weekday-str">{{ getShortWeekday(date) }}</p>
      <p class="date-str">{{ getShortDateStr(date) }}</p>
    </div>

    <div class="time-map" @click="createNewEventClick">
      <span v-for="_ in times" class="timestamp"></span>

      <div class="event-holder">
        <calendar-event
          v-for="calendarEventModel of getTodaysEvents()"
          :calendarEventModel="calendarEventModel"
          @click.stop
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  methods: {
    getTodaysEvents(): CalendarEventModel[] {
      const eventStore = useEventStore();
      return eventStore.getEventsForDate(this.date);
    },
    createNewEventClick(event: MouseEvent) {
      const startHour = detectTimeMapClickLocation(this.date, event.x);

      if (startHour) {
        useNewEventStartTimeStore().setStartTime(startHour);
      }

      showNewEventModal();
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
    const timestampDivs =
      calendarDayDiv.getElementsByClassName('timestamp');

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: min(10%, 10rem);

    background-color: blueviolet; // temp

    p {
      margin: 0;

      &.weekday-str {
        font-size: 1.25rem;
      }

      &.date-str {
        font-size: 1rem;
      }
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
