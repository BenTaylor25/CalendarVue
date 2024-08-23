<script setup lang="ts">
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
    />
  </div>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
#calendar-main {
  border: 1px solid white;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
}
</style>
