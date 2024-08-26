<script setup lang="ts">
import CalendarMonthWeekRow from './CalendarMonthWeekRow.vue';

</script>

<template>
  <div id="month-view">
    <calendar-month-week-row
      v-for="(days, index) in weeks"
      :key="days[0]?.toDateString() ?? index"
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
    null
  ]
] as Array<Array<Date | null>>;

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
