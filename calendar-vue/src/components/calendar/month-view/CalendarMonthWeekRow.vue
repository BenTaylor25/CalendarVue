<script setup lang="ts">
import { PropType } from 'vue';

import CalendarMonthDay from './CalendarMonthDay.vue';
</script>

<template>
  <div class="month-week-row">
    <calendar-month-day
      v-for="(day, index) in days"
      :key="day?.toDateString() ?? index"
      :day="day"
      :shouldBeGreyedOut="shouldBeGreyedOut"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    days: {
      type: Array as PropType<Array<Date | null>>,
      required: true
    },
    shouldBeGreyedOut: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
.month-week-row {
  display: flex;
  width: 100%;
  height: inherit;

  // Seperate weekdays from weekend.
  :nth-child(5) {
    margin-right: 6%;
  }
}
</style>
