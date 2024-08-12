<script setup lang="ts">
import { MODAL_IDS } from '../../constants/modalConstants.ts';
import { hideNewEventModal } from '../../modalController.ts';
import ModalShadow from './ModalShadow.vue';
</script>

<template>
  <modal-shadow
    :id="MODAL_IDS.NEW_EVENT_MODAL"
    @click="hideNewEventModal()"
  >

    <div
      id="new-event-modal-content"
      @click.stop
    >

      <h1>New Event</h1>

      <p>foo</p>

    </div>

  </modal-shadow>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">

#new-event-modal-content {
  position: absolute;
  flex-direction: column;
  background-color: bisque;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  top: 40%;
  left: 40%;
  bottom: 40%;
  right: 40%;
  min-height: 10rem;

  &.show {
    display: flex;
  }

  h1, p {
    color: black;
  }
}

</style>
