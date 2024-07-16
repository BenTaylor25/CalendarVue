<script setup lang="ts">
import { onMounted } from 'vue';
import { DEFAULT_CALENDAR_ZOOM } from '../../constants/settingsConstants';

import { useEventStore } from '../../stores/CalendarStore';

const eventStore = useEventStore();

onMounted(() => {
  setZoomOnCalendarEvents(DEFAULT_CALENDAR_ZOOM);
});

</script>

<template>
  <div class="calendar-event">
    <p>test</p>
  </div>
</template>

<script lang="ts">

export function setZoomOnCalendarEvents(zoom: number) {
  const eventDivs = document.getElementsByClassName('calendar-event');

  // TODO Error Handling

  for (const eventDiv of eventDivs) {

    const event = useEventStore().events[0];

    const eventStartTime = event.startTime.getHours();
    const eventDuration = event.endTime.getHours() - event.startTime.getHours();   // doesn't handle multi-day events

    const leftOffset = eventStartTime * zoom * 2;   // FIX OFFSET CALCULATION
    const width = eventDuration * zoom * 2;

    (eventDiv as HTMLDivElement).style.left = `${leftOffset}rem`;
    (eventDiv as HTMLDivElement).style.width = `${width}rem`;
  }
}

</script>

<style lang="scss">
.calendar-event {
  position: absolute;
  height: 5rem;
  background-color: lime;
}
</style>
