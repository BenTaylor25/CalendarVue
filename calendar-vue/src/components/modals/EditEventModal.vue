<script setup lang="ts">

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import { hideEditEventModal } from '../../modalController.ts';

import ModalShadow from './ModalShadow.vue';
</script>

<template>
  <modal-shadow
    :id="MODAL_IDS.EDIT_EVENT_MODAL"
    @click="hideEditEventModal()"
  >

  <div
    id="edit-event-modal-content"
    @click.stop
  >
    <h1>Edit Event</h1>

  </div>

  </modal-shadow>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
#edit-event-modal-content {
  position: absolute;
  flex-direction: column;
  background-color: bisque;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  top: 20%;
  left: 30%;
  bottom: 20%;
  right: 30%;
  min-height: 10rem;

  &.show {
    display: flex;
  }

  h1, label {
    color: black;
  }
}
</style>
