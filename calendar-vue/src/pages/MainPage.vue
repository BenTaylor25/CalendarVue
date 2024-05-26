<script setup lang="ts">
import CalendarMain from '../components/calendar/CalendarMain.vue';
</script>

<template>
  <div id="main-page-container">

    <div id="header">
      <p>header</p>
    </div>

    <calendar-main />

  </div>
</template>

<style scoped lang="scss">

#main-page-container {
  display: grid;
  grid-template-rows: 10vh 90vh;
  width: 100vw;

  #header {
    border: 1px solid yellow;
  }
}

</style>
