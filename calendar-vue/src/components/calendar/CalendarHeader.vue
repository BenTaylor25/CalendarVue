<script setup lang="ts">
</script>

<template>
  <div id="calendar-header">

    <div id="month-control">
      <p>month</p>
    </div>

    <div id="time-bar">

    </div>

  </div>
</template>

<style scoped lang="scss">
#calendar-header {
  border: 1px solid blue;
  height: 12.5%;

  #month-control {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: min(10%, 10rem);

    background-color: purple; // temp

    p {
      color: black;
    }

  }
}
</style>
