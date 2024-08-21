<script setup lang="ts">
import { ref } from 'vue';

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import { CalendarEventModel } from '../../models/CalendarEventModel.ts';
import { hideNewEventModal } from '../../modalController.ts';
import {
  dateFromFormatString,
  newEventFormIsValid
} from '../../validation/newEventFormValidation.ts';
import { dateToString } from '../../helpers/dateStringFormatting.ts';
import { useEventStore } from '../../stores/CalendarStore.ts';
import {
  useNewEventStartTimeStore
} from '../../stores/NewEventStartTime.ts';

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

        <label for="new-event-name">Event Name</label>
        <input
          id="new-event-name"
          type="text"
          v-model="newEventName"
        />

        <label for="new-event-start-time">Start Date and Time</label>
        <input
          id="new-event-start-time"
          type="datetime-local"
          v-model="newEventStartDateTimeStr"
        />

        <label for="new-event-end-time">End Date and Time</label>
        <input
          id="new-event-end-time"
          type="datetime-local"
          v-model="newEventEndDateTimeStr"
        />

        <button
          id="submit-new-event-form"
          type="submit"
        >
          Submit
        </button>

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
    console.error(
      "Null start or end time passed new event form validation."
    );
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
  hideNewEventModal();
}

function clearForm() {
  newEventName.value = '';
  newEventStartDateTimeStr.value = '';
  newEventEndDateTimeStr.value = '';

  hideFormErrorMessage();
}

function showFormErrorMessage() {
  const formErrorMessageDOM =
    document.getElementById('form-error-message');

  if (formErrorMessageDOM) {
    formErrorMessageDOM.classList.add('show');
  }
}

function hideFormErrorMessage() {
  const formErrorMessageDOM =
    document.getElementById('form-error-message');

  if (formErrorMessageDOM) {
    formErrorMessageDOM.classList.remove('show');
  }
}

export function refreshModal() {
  const startTimeStore = useNewEventStartTimeStore();
  const startTimeResult = startTimeStore.getStartTime();

  
  if (startTimeResult.isKnown) {
    //#region Error Handling
    if (startTimeResult.time == null) {
      console.error("New Event Start Time store 'isKnown' is true but 'time' is null.");
      return;
    }
    //#endregion

    const oneHourInMs = 60 * 60 * 1000;

    const startTime = startTimeResult.time;
    const endTime = new Date(startTime.getTime() + oneHourInMs);

    newEventStartDateTimeStr.value = dateToString(startTime);
    newEventEndDateTimeStr.value = dateToString(endTime);
  } else {
    newEventStartDateTimeStr.value = '';
    newEventEndDateTimeStr.value = '';
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

  h1, label {
    color: black;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    label {
      text-align: left;
      margin-top: 1rem;
      margin-bottom: 0;
    }

    input {
      margin-bottom: 1rem;
    }

    button#submit-new-event-form {
      margin-top: 2rem;
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
