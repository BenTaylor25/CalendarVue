<script setup lang="ts">
import { ref } from 'vue';

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import {
  dateFromFormatString
} from '../../validation/newEventFormValidation.ts';
import { dateToString } from '../../helpers/dateStringFormatting.ts';
import { hideEditEventModal } from '../../modalController.ts';
import { useEventStore } from '../../stores/CalendarStore.ts';

import ModalShadow from './ModalShadow.vue';
import { apiUpdateEvent } from '../../api/CalendarEvents/updateEvent.ts';
import { CalendarEventModel } from '../../models/CalendarEventModel.ts';
</script>

<template>
  <modal-shadow
    :id="MODAL_IDS.EDIT_EVENT_MODAL"
    @click="closeModal()"
  >

  <div
    id="edit-event-modal-content"
    @click.stop
  >
    <h1>Edit Event</h1>

    <form @submit.prevent="confirmChanges()">

      <label for="event-name">Event Name</label>
      <input
        id="event-name"
        type="text"
        v-model="eventName"
      />

      <label for="new-event-start-time">Start Date and Time</label>
      <input
        id="new-event-start-time"
        type="datetime-local"
        v-model="eventStartDateTimeStr"
      />

      <label for="new-event-end-time">End Date and Time</label>
      <input
        id="new-event-end-time"
        type="datetime-local"
        v-model="eventEndDateTimeStr"
      />

      <button
        id="submit-confirm-changes-form"
        type="submit"
      >
        Submit
      </button>

    </form>

    <button
      id="delete-event-button"
      @click="deleteButtonPressed()"
    >
      Delete Event
    </button>

  </div>

  </modal-shadow>
</template>

<script lang="ts">
const eventName = ref('');
const eventStartDateTimeStr = ref('');
const eventEndDateTimeStr = ref('');

export function refreshEditEventModal() {
  const eventStore = useEventStore();

  if (eventStore.selectedEvent) {
    eventName.value = eventStore.selectedEvent.name;
    eventStartDateTimeStr.value =
      dateToString(eventStore.selectedEvent.startTime);
    eventEndDateTimeStr.value =
      dateToString(eventStore.selectedEvent.endTime);
  }
}

function hasUnsavedChanges(): boolean {
  const eventStore = useEventStore();

  //#region Error Handling
  if (!eventStore.selectedEvent) {
    return false;
  }
  //#endregion

  const nameHasChanged =
    eventStore.selectedEvent.name != eventName.value;

  const startTimeHasChanged =
    eventStore.selectedEvent.startTime.getTime() !=
      dateFromFormatString(eventStartDateTimeStr.value)?.getTime();

  const endTimeHasChanged =
    eventStore.selectedEvent.endTime.getTime() !=
      dateFromFormatString(eventEndDateTimeStr.value)?.getTime();

  return nameHasChanged || startTimeHasChanged || endTimeHasChanged;
}

export default {
  methods: {
    closeModal() {
      const confirmPrompt = "You have unsaved changes, " +
        "are you sure you want to cancel?";

      const shouldCloseModal =
        !hasUnsavedChanges() ||
        window.confirm(confirmPrompt);

      if (shouldCloseModal) {
        hideEditEventModal();

        const eventStore = useEventStore();
        eventStore.selectedEvent = null;
      }
    },
    confirmChanges() {
      const newStartTimeDate =
        dateFromFormatString(eventStartDateTimeStr.value);
      const newEndTimeDate =
        dateFromFormatString(eventEndDateTimeStr.value);

      //#region Error Handling
      if (newStartTimeDate == null || newEndTimeDate == null) {
        console.error("Attempted to update event date to null value.");
        return;
      }
      //#endregion

      const eventStore = useEventStore();

      if (eventStore.selectedEvent) {
        eventStore.selectedEvent.name = eventName.value;
        eventStore.selectedEvent.startTime = newStartTimeDate;
        eventStore.selectedEvent.endTime = newEndTimeDate;

        apiUpdateEvent(eventStore.selectedEvent as CalendarEventModel);
      }

      this.closeModal();
    },
    deleteButtonPressed() {
      const shouldDelete = confirm(
        "Are you sure you want to delete this event?"
      );

      if (shouldDelete) {
        const eventStore = useEventStore();
        eventStore.deleteSelectedEvent();
        hideEditEventModal();
      }
    }
  }
}
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

    button#submit-confirm-changes-form {
      margin-top: 2rem;
    }
  }

  button#delete-event-button {
    margin-top: 2rem;
    background-color: red;
    border-color: red;
  }
}
</style>
