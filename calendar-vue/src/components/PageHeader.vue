<script setup lang="ts">
import { showZoomSettingsModal } from '../modalController';

</script>

<template>
  <div id="header">

    <div id="settings">

      <div id="zoom-setting" @click="showZoomSettingsModal">
        <p>Zoom</p>
      </div>

    </div>

  </div>
</template>

<style lang="scss">

#header {
  display: flex;
  align-items: center;
  justify-content: end;

  #settings {
    margin-right: 1rem;

    * {
      height: 50%;
      background: blue;
      padding: 0.1rem 0.3rem;
      cursor: pointer;
    }

  }
}

</style>
