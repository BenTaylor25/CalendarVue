<script setup lang="ts">
import { syncroniseScrollingWithDays } from './CalendarHeader.vue';
import { useDateStore } from '../../stores/DateStore.ts';

import CalendarHeader from './CalendarHeader.vue';
import CalendarDay from './CalendarDay.vue';

const dateStore = useDateStore();
</script>

<template>
  <div id="calendar-main">
    <calendar-header />

    <calendar-day
      v-for="day in dateStore.visibleDays"
      :key="day.toDateString()"
      :date="day"
      @wheel="scrollThroughDates"
    />
  </div>
</template>

<script lang="ts">
const SCROLL_DELTA_THRESHOLD = 10;

export default {
  methods: {
    scrollThroughDates(event: WheelEvent) {
      const dateStore = useDateStore();

      const shouldScrollUp = event.deltaY < -SCROLL_DELTA_THRESHOLD;
      const shouldScrollDown = event.deltaY > SCROLL_DELTA_THRESHOLD;

      if (shouldScrollUp) {
        dateStore.scrollUp();
      } else if (shouldScrollDown) {
        dateStore.scrollDown();
      }

      syncroniseScrollingWithDays();
    }
  }
}
</script>

<style scoped lang="scss">
#calendar-main {
  border: 1px solid white;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
}
</style>
