<script setup lang="ts">

</script>

<template>
  <div class="month-week-row">
    <div class="month-day mon" />
    <div class="month-day tue" />
    <div class="month-day wed" />
    <div class="month-day thu" />
    <div class="month-day fri" />
    <div class="month-day sat" />
    <div class="month-day sun" />
  </div>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
.month-week-row {
  display: flex;
  width: 100%;
  height: 15%;

  .month-day {
    width: calc(100% / 7);
    height: 100%;
    border: 1px solid gray;

    &:hover {
      background-color: green;
    }
  }

  .fri {
    margin-right: 10%;
  }
}
</style>
