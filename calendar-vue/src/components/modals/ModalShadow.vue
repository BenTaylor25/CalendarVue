<script setup lang="ts">
import { hideAllModals } from '../../modalController';

</script>

<template>

  <div id="modal-shadow" @click="hideAllModals"></div>

</template>

<style lang="scss">
#modal-shadow {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(150,100,100,.8);

  &.show {
    display: flex;
  }
}
</style>
