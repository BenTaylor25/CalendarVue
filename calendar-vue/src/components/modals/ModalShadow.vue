<script setup lang="ts">

</script>

<template>
  <div
    :id
    class="modal-shadow"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.modal-shadow {
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
