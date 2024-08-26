<script setup lang="ts">
import { PropType } from 'vue';

import CalendarMonthDay from './CalendarMonthDay.vue';
</script>

<template>
  <div class="month-week-row">
    <calendar-month-day
      v-for="day in days"
      :key="day.toDateString()"
      :day="day"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    days: {
      type: Array as PropType<Date[]>,
      required: true
    }
  }
}
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
