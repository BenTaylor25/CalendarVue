<script setup la
  components: { CalendarDay },ng="ts">
import CalendarHeader from './CalendarHeader.vue';
import CalendarDay from './CalendarDay.vue';

let daysOfWeek = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
];
</script>

<template>
  <div id="calendar-main">
    <calendar-header />

    <calendar-day
      v-for="day in daysOfWeek"
      v-bind:key="day"
    />
  </div>
</template>

<style scoped lang="scss">
#calendar-main {
  border: 1px solid white;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
}
</style>
