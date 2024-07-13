<script setup lang="ts">
import { MODAL_SHADOW_ID } from '../../constants/modalConstants';
import { hideAllModals } from '../../modalController';
</script>

<template>

  <div :id="MODAL_SHADOW_ID" @click="hideAllModals"></div>

</template>

<style lang="scss">
#modal-shadow {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(150, 100, 100, .6);

  &.show {
    display: flex;
  }
}
</style>
