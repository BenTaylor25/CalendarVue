<script setup lang="ts">
import { PropType } from 'vue';
</script>

<template>
  <div class="month-day" @click="dayClicked()" />
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
    }
  }
}
</script>

<style scoped lang="scss">
.month-day {
  width: calc(100% / 7);
  height: 100%;
  border: 1px dotted gray;

  &:hover {
    background-color: green;
  }
}
</style>
