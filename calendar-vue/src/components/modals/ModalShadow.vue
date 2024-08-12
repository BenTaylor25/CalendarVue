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

</style>
