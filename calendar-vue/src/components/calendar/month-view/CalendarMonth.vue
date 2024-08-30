<script setup lang="ts">
import { getMonthViewDates } from '../../../helpers/getMonthViewDates.ts';

import CalendarMonthWeekRow from './CalendarMonthWeekRow.vue';

</script>

<template>
  <div id="month-view">
    <calendar-month-week-row
      v-for="(days, index) in weeksSource"
      :key="days[0]?.toDateString() ?? index"
      :days="days"
      :isFirstOrLast="isFirstOrLastRow(index)"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    weeksSource: {
      type: Array<Array<Date>>,
      required: true
    }
  },
  methods: {
    isFirstOrLastRow(index: number) {
      const rowCount = this.weeksSource.length;
      return index === 0 || index === rowCount - 1;
    }
  }
}
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
