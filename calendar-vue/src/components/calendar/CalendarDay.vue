<script setup lang="ts">

const times: string[] = [""];

for (let i = 1; i <= 24; i++) {
  times.push(`${i}:00`);
}

</script>

<template>
  <div class="calendar-day">

    <div class="weekday">
      <p>{{ weekday }}</p>
    </div>

    <div class="time-map">
      <span v-for="_ in times" class="timestamp"></span>
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

  .time-map {
    display: flex;
    width: max(90%, calc(100% - 10rem));
    overflow-x: auto; // hide once synced
    overflow-y: hidden;

    .timestamp {
      padding: 3rem;
      width: 5rem;

      &:not(:last-child) {
        border-right: 1px solid gold;
      }
    }
  }
}
</style>
