<script setup lang="ts">
import CalendarMonthWeekRow from './CalendarMonthWeekRow.vue';

</script>

<template>
  <div id="month-view">
    <calendar-month-week-row
      v-for="days in weeks"
      :key="days[0].toDateString()"
      :days="days"
    />
  </div>
</template>

<script lang="ts">

const weeks = [
  [
    new Date(2024, 7, 26),
    new Date(2024, 7, 27),
    new Date(2024, 7, 28),
    new Date(2024, 7, 29),
    new Date(2024, 7, 30),
    new Date(2024, 7, 31),
    new Date(2024, 8, 1)
  ]
] as Date[][];

</script>

<style scoped lang="scss">
#month-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 10%;
}
</style>
