<script setup lang="ts">
import CalendarMonthDay from './CalendarMonthDay.vue';
</script>

<template>
  <div class="month-week-row">
    <calendar-month-day class="mon" />
    <calendar-month-day class="tue" />
    <calendar-month-day class="wed" />
    <calendar-month-day class="thu" />
    <calendar-month-day class="fri" />
    <calendar-month-day class="sat" />
    <calendar-month-day class="sun" />
  </div>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
.month-week-row {
  display: flex;
  width: 100%;
  height: 15%;

  .fri {
    margin-right: 10%;
  }
}
</style>
