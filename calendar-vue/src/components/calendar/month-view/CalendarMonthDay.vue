<script setup lang="ts">
import { PropType } from 'vue';
import { useDateStore } from '../../../stores/DateStore';
import { syncroniseScrollingWithDays } from '../CalendarHeader.vue';
</script>

<template>

  <div
    class="month-day"
    :class="styleClassesCheck()"
    @click="dayClicked()"
  />

</template>

<script lang="ts">
export default {
  props: {
    day: {
      type: [Date, null] as unknown as PropType<Date | null>,
      required: true
    },
    isFirstOrLast: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    dayClicked() {
      if (this.day) {
        const dateStore = useDateStore();
        dateStore.topOfScreenDate = this.day;
        
        // State changes get sent to the virtual DOM first and are
        // updated in batches. `nextTick()` has the callback
        // wait a small amount of time before executing.
        this.$nextTick(() => {
          syncroniseScrollingWithDays();
        });
      }
    },
    styleClassesCheck(): string {
      const disabled = this.disabledCheck();
      const selected = this.selectedCheck();
      const today = this.todayCheck();

      const firstOrLast = this.isFirstOrLast ? 'first-or-last' : '';

      return `${disabled} ${selected} ${today} ${firstOrLast}`;
    },
    disabledCheck(): string {
      return this.day === null ? 'disabled' : '';
    },
    selectedCheck(): string {
      const dateStore = useDateStore();
      const selectedDay = dateStore.topOfScreenDate;

      //#region Error Handling
      if (selectedDay === null || this.day === null) {
        return '';
      }
      //#endregion

      const dayIsSelected =
        selectedDay.getFullYear() === this.day.getFullYear() &&
        selectedDay.getMonth() === this.day.getMonth() &&
        selectedDay.getDate() === this.day.getDate();

      return dayIsSelected ? 'selected' : '';
    },
    todayCheck(): string {
      const today = new Date();

      const dayIsToday =
        today.getFullYear() === this.day?.getFullYear() &&
        today.getMonth() === this.day?.getMonth() &&
        today.getDate() === this.day?.getDate();

      return dayIsToday ? 'today' : '';
    }
  }
}
</script>

<style scoped lang="scss">
.month-day {
  width: calc(100% / 7);
  height: 100%;
  border: 1px solid bisque;
  border-radius: 50%;

  &.disabled {
    border: none;
  }
  
  &:not(.disabled) {
    &:hover {
      background-color: green;
    }

    &:not(:hover).selected {
      background-color: darkgreen;
    }

    &.today {
      // border-color: yellow;
      border: 1px solid cyan;
    }

    &.first-or-last {
      border-color: gray;
    }
  }
}
</style>
