<script setup lang="ts">
import MainPage from './pages/MainPage.vue';

import ModalShadow from './components/modals/ModalShadow.vue';
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
  <modal-shadow />

</template>

<style scoped lang="scss">

</style>
