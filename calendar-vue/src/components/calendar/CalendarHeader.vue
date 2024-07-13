<script setup lang="ts">

const times: string[] = [""];

for (let i = 1; i <= 24; i++) {
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
      position: relative;
      padding: 0 3rem;
      width: 5rem;

      &:not(:last-child) {
        border-right: 1px solid gold;
      }

      span {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);

        background-color: black; // temp
      }
    }

  }
}
</style>
