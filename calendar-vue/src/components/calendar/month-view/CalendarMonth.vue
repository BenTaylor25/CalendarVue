<script setup lang="ts">
import CalendarMonthWeekRow from './CalendarMonthWeekRow.vue';

</script>

<template>
  <div id="month-view">
    <calendar-month-week-row />
    <calendar-month-week-row />
    <calendar-month-week-row />
    <calendar-month-week-row />
    <calendar-month-week-row />
    <calendar-month-week-row />
  </div>
</template>

<script lang="ts">
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
