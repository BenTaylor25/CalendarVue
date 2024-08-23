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
      v-bind:key="day"
      :date="day"
      @wheel="scrollThroughDates"
    />
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    scrollThroughDates(event: WheelEvent) {
      const dateStore = useDateStore();

      const shouldScrollUp = event.deltaY < -10;
      const shouldScrollDown = event.deltaY > 10;

      if (shouldScrollUp) {
        dateStore.scrollUp();
      } else if (shouldScrollDown) {
        dateStore.scrollDown();
      }

      // State changes get sent to the virtual DOM first and are
      // updated in batches. `nextTick()` has the callback
      // wait a small amount of time before executing.
      this.$nextTick(() => {
        syncroniseScrollingWithDays();
      });
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
