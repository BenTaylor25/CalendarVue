<script setup lang="ts">
import { PropType } from 'vue';
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
      return `${this.disabledCheck()} ${this.todayCheck()}`;
    },
    disabledCheck(): string {
      return this.day === null ? 'disabled' : '';
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
    
    &.today {
      border-color: yellow;
    }
  }

}
</style>
