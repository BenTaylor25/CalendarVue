<script setup lang="ts">

const times: string[] = [];

for (let i = 0; i <= 24; i++) {
  times.push(`${i}:00`);
}

</script>

<template>
  <div id="calendar-header">

    <div id="month-control">
      <p>month</p>
    </div>

    <div id="time-bar">

      <div v-for="time in times" class="timestamp">
        <span>{{ time }}</span>
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
#calendar-header {
  display: flex;
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

  #time-bar {
    display: flex;
    width: 90%;
    overflow-x: auto;
    scrollbar-width: thin;

    .timestamp {
      padding: 1rem;
      width: 3rem;

      &:not(:first-child) {
        border-left: 1px solid gold;
      }
    }

  }
}
</style>
