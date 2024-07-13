<script setup lang="ts">

</script>

<template>
  <div id="zoom-settings-modal">
    test
  </div>
</template>

<style lang="scss">

#zoom-settings-modal {
  display: none;
  position: absolute;
  top: 20%;
  left: 20%;
  bottom: 20%;
  right: 20%;
  background-color: bisque;
  justify-content: center;
  align-items: center;

  &.show {
    display: flex;
  }
}

</style>
