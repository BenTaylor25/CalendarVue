<script setup lang="ts">
import { PropType } from 'vue';
import { useDateStore } from '../../../stores/DateStore';
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
    }
  },
  methods: {
    dayClicked() {
      if (this.day) {
        console.log(`${this.day?.toDateString() ?? 'null' } was clicked`);
      }
    },
    styleClassesCheck(): string {
      const disabled = this.disabledCheck();
      const selected = this.selectedCheck();
      const today = this.todayCheck();

      return `${disabled} ${selected} ${today}`;
    },
    disabledCheck(): string {
      return this.day === null ? 'disabled' : '';
    },
    selectedCheck(): string {
      const dateStore = useDateStore();
      const selectedDay = dateStore.topOfScreenDate;

      //#region Error Handling
      if (
        selectedDay === null ||
        this.day === null
      ) {
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
  border: 1px solid gray;
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
      border-color: yellow;
    }
  }

}
</style>
