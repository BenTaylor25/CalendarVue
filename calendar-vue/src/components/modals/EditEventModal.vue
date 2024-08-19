<script setup lang="ts">
import { ref } from 'vue';

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import { dateFromFormatString } from '../../validation/newEventFormValidation.ts';
import { dateToString } from '../../helpers/dateStringFormatting.ts';
import { hideEditEventModal } from '../../modalController.ts';
import { useEventStore } from '../../stores/CalendarStore.ts';

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

    <form @submit.prevent="confirmChanges()">

      <label for="event-name">Event Name</label>
      <input
        id="event-name"
        type="text"
        v-model="eventName"
      />

      <button
        id="submit-new-event-form"
        type="submit"
      >
        Submit
      </button>

    </form>

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
    eventEndDateTimeStr.value = dateToString(eventStore.selectedEvent.endTime);
  }
}

export default {
  methods: {
    closeModal() {
      hideEditEventModal();

      const eventStore = useEventStore();
      eventStore.selectedEvent = null;
    },
    confirmChanges() {
      const eventStore = useEventStore();

      if (eventStore.selectedEvent) {
        eventStore.selectedEvent.name = eventName.value;
        eventStore.selectedEvent.startTime =
          dateFromFormatString(eventStartDateTimeStr.value);
        eventStore.selectedEvent.endTime =
          dateFromFormatString(eventEndDateTimeStr.value);
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
}
</style>
