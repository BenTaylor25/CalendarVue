<script setup lang="ts">
import { onMounted } from 'vue';
import { DEFAULT_CALENDAR_ZOOM } from '../../constants/settingsConstants';
import { CalendarEvent } from '../../models/CalendarEvent';

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

const events: CalendarEvent[] = [];

export function setZoomOnCalendarEvents(zoom: number) {
  const eventDivs = document.getElementsByClassName('calendar-event');

  // TODO Error Handling

  for (const eventDiv of eventDivs) {
    let eventStartTime = 1;
    let eventDuration = 1;

    const leftOffset = eventStartTime * zoom * 2;
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
