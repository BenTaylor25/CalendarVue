<script setup lang="ts">
import { PropType } from 'vue';
</script>

<template>

  <div
    class="month-day"
    :class="disabledCheck()"
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
      console.log(`${this.day?.toDateString() ?? 'null' } was clicked`);
    },
    disabledCheck(): string {
      return this.day === null ? 'disabled' : '';
    }
  }
}
</script>

<style scoped lang="scss">
.month-day {
  width: calc(100% / 7);
  height: 100%;
  border: 1px dotted gray;

  &:not(.disabled):hover {
    background-color: green;
  }

  &.disabled {
    border: none;
  }
}
</style>
