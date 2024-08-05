<script setup lang="ts">
import { onMounted } from 'vue';
import { DEFAULT_CALENDAR_ZOOM } from '../../constants/settingsConstants';

import { useEventStore } from '../../stores/CalendarStore';
import { CalendarEventModel } from '../../models/CalendarEventModel';

onMounted(() => {
  setZoomOnCalendarEvents(DEFAULT_CALENDAR_ZOOM);
});

</script>

<template>
  <div class="calendar-event">
    <p>{{calendarEventModel?.name}}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    calendarEventModel: CalendarEventModel
  }
}

export function setZoomOnCalendarEvents(zoom: number) {
  const eventDivs = document.getElementsByClassName('calendar-event');

  // TODO Error Handling

  for (const eventDiv of eventDivs) {

    const event = useEventStore().events[0];

    const eventStartTime = event.startTime.getHours();
    const eventDuration = event.endTime.getHours() - event.startTime.getHours();   // doesn't handle multi-day events

    const leftOffsetRem = eventStartTime * zoom * 2;
    const leftOffsetPx = eventStartTime;

    const width = eventDuration * zoom;

    (eventDiv as HTMLDivElement).style.left = `calc(${leftOffsetRem}rem + ${leftOffsetPx}px)`;
    (eventDiv as HTMLDivElement).style.width = `${width}rem`;
  }
}

</script>

<style lang="scss">
.calendar-event {
  position: absolute;
  height: 5rem;
  background-color: lime;

  p {
    color: black;
  }
}
</style>
