<script setup lang="ts">

const times: string[] = [""];

for (let i = 1; i <= 24; i++) {
  times.push(`${i}:00`);
}

function syncroniseScrollingWithDays() {
  const headerTimeMapDiv = document.getElementById('time-bar') as HTMLDivElement;
  const dayTimeMapDivs = document.getElementsByClassName('calendar-day') as HTMLCollection;

  //#region Error Handling
  if (headerTimeMapDiv == null) {
    console.error("headerTimeMapDiv not found.");
  }

  if (dayTimeMapDivs == null) {
    console.error("dayTimeMapDivs not found.");
  }

  if (dayTimeMapDivs.length == 0) {
    console.error("Scroll detected on Calendar Header but no days were found");
  }
  //#endregion

  for (const dayTimeMapDiv of dayTimeMapDivs) {
    const timeMapDivs = dayTimeMapDiv.getElementsByClassName('time-map');

    //#region Error Handling
    if (timeMapDivs.length != 1) {
      console.error("Found incorrect number of 'time-map's inside day.");
    }
    //#endregion

    const timeMapDiv = timeMapDivs[0];
    timeMapDiv.scrollLeft = headerTimeMapDiv.scrollLeft;
  }
}

</script>

<template>
  <div id="calendar-header">

    <div id="month-control">
      <p>month</p>
    </div>

    <div id="time-bar" @scroll="syncroniseScrollingWithDays">

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
    width: max(90%, calc(100% - 10rem));
    overflow-x: auto;
    scrollbar-width: thin;
    transform: rotateX(180deg);   // Move scrollbar to the top.

    .timestamp {
      position: relative;
      padding: 0 3rem;
      width: 5rem;
      transform: rotateX(180deg);

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
