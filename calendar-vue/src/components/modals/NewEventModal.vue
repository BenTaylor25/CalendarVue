<script setup lang="ts">
import { ref } from 'vue';

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

      <form @submit.prevent="createNewEventIfValid()">

        <p>Event Name</p>
        <input
          type="text"
          v-model="newEventName"
        />

        <!-- TODO: p should be label -->
        <p>Start Date and Time</p>
        <input
          type="datetime-local"
          v-model="newEventStartDateTime"
        />

        <p>End Date and Time</p>
        <input
          type="datetime-local"
          v-model="newEventEndDateTime"
        />

        <button type="submit">Submit</button>

      </form>

    </div>

  </modal-shadow>
</template>

<script lang="ts">

const newEventName = ref('');
const newEventStartDateTime = ref('');
const newEventEndDateTime = ref('');

function newEventFormIsValid(): boolean {
  const nameIsValid =
    newEventName !== undefined &&
    newEventName.value !== '';

  const eventIsValid =
    nameIsValid;

  return eventIsValid;
}

function createNewEventIfValid() {
  if (!newEventFormIsValid()) {
    // Display Error.
    return;
  }

  console.log(newEventName.value);
  // TODO: Create new event in store.
  clearForm();
}

function clearForm() {
  newEventName.value = '';
}

</script>

<style scoped lang="scss">

#new-event-modal-content {
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

  h1, p {
    color: black;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    p {
      text-align: left;
      margin-bottom: 0;
    }

    input {
      margin-bottom: 1rem;
    }
  }
}

</style>
