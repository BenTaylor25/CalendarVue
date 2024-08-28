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
      :isFirstOrLast="isFirstOrLast"
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
    isFirstOrLast: {
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
  height: 15%;

  // Seperate weekdays from weekend.
  :nth-child(5) {
    margin-right: 6%;
  }
}
</style>
