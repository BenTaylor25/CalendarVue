<script setup lang="ts">
import MainPage from './pages/MainPage.vue';

import ZoomSettingModal from './components/modals/ZoomSettingModal.vue';
import NewEventModal from './components/modals/NewEventModal.vue';
</script>

<template>

  <!-- Router? -->
  <main-page />

  <!-- Modals -->
  <!--
    There is certainly a better way of doing this,
    but this is easy and should be fairly clean
    for a project of this size.
  -->
  <zoom-setting-modal />
  <new-event-modal />

</template>

<style scoped lang="scss">

</style>
