<script setup lang="ts">
import MainPage from './pages/MainPage.vue';

import ZoomSettingModal from './components/modals/ZoomSettingModal.vue';
import NewEventModal from './components/modals/NewEventModal.vue';
import { hideAllModals } from './modalController';
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

<script lang="ts">
document.querySelector('body')
  ?.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideAllModals();
    }
  });
</script>

<style scoped lang="scss">

</style>
