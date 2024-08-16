<script setup lang="ts">
import { ref } from 'vue';

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import { CalendarEventModel } from '../../models/CalendarEventModel.ts';
import { hideNewEventModal } from '../../modalController.ts';
import { dateFromFormatString, newEventFormIsValid } from '../../validation/newEventFormValidation.ts';
import { useEventStore } from '../../stores/CalendarStore.ts';

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
          v-model="newEventStartDateTimeStr"
        />

        <p>End Date and Time</p>
        <input
          type="datetime-local"
          v-model="newEventEndDateTimeStr"
        />

        <button type="submit">Submit</button>

      </form>

      <p id="form-error-message">{{ formErrorMessage }}</p>

    </div>

  </modal-shadow>
</template>

<script lang="ts">
const newEventName = ref('');
const newEventStartDateTimeStr = ref('');
const newEventEndDateTimeStr = ref('');

let formErrorMessage = ref('');

function createNewEventIfValid() {
  const result = newEventFormIsValid(
    newEventName.value,
    newEventStartDateTimeStr.value,
    newEventEndDateTimeStr.value
  );

  if (!result.success) {
    formErrorMessage.value = result.errorMessage;
    showFormErrorMessage();
    return;
  }

  const startTime = dateFromFormatString(newEventStartDateTimeStr.value);
  const endTime = dateFromFormatString(newEventEndDateTimeStr.value);

  //#region Error Handling
  if (startTime === null || endTime == null) {
    console.error("Null start or end time passed new event form validation.");
    console.info(`startTime: '${startTime}'.`);
    console.info(`endTime: '${endTime}'.`);
    return;
  }
  //#endregion

  const eventStore = useEventStore();
  eventStore.addEvent(new CalendarEventModel(
    newEventName.value,
    startTime,
    endTime
  ));

  clearForm();
}

function clearForm() {
  newEventName.value = '';
  newEventStartDateTimeStr.value = '';
  newEventEndDateTimeStr.value = '';

  hideFormErrorMessage();
}

function showFormErrorMessage() {
  const formErrorMessageDOM = document.getElementById('form-error-message');

  if (formErrorMessageDOM) {
    formErrorMessageDOM.classList.add('show');
  }
}

function hideFormErrorMessage() {
  const formErrorMessageDOM = document.getElementById('form-error-message');

  if (formErrorMessageDOM) {
    formErrorMessageDOM.classList.remove('show');
  }
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

  p#form-error-message {
    display: none;
    color: red;
    font-weight: bold;

    &.show {
      display: block;
    }
  }
}
</style>
