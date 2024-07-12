<script setup lang="ts">

</script>

<template>
  <div class="calendar-day">

    <div class="weekday">
      <p>{{ weekday }}</p>
    </div>

    <div class="time-map">
      <p>calendar-day</p>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  props: {
    weekday: String
  }
}
</script>

<style scoped lang="scss">
.calendar-day {
  display: flex;
  border: 1px solid green;
  height: 12.5%;

  .weekday {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: min(10%, 10rem);

    background-color: blueviolet; // temp

    p {
      font-size: 1.25rem;
    }
  }
}
</style>
