<script setup lang="ts">

import { MODAL_IDS } from '../../constants/modalConstants.ts';
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

    <form @submit.prevent>

      <label for="event-name">Event Name</label>
      <input
        id="event-name"
        type="text"
        v-model="name"
      />

    </form>

  </div>

  </modal-shadow>
</template>

<script lang="ts">
export default {
  computed: {
    name: {
      get: () => {
        const eventStore = useEventStore();
        return eventStore.selectedEvent?.name ?? "Could not find event.";
      },
      set: (name: string) => {
        const eventStore = useEventStore();

        if (eventStore.selectedEvent) {
          eventStore.selectedEvent.name = name;
        }
      }
    },
    startTime: {
      get: () => {
        const eventStore = useEventStore();
        return eventStore.selectedEvent?.startTime;
      },
      set: (startTime: Date) => {
        const eventStore = useEventStore();

        if (eventStore.selectedEvent) {
          eventStore.selectedEvent.startTime = startTime;
        }
      }
    },
    endTime: {
      get: () => {
        const eventStore = useEventStore();
        return eventStore.selectedEvent?.endTime;
      },
      set: (endTime: Date) => {
        const eventStore = useEventStore();

        if (eventStore.selectedEvent) {
          eventStore.selectedEvent.endTime = endTime;
        }
      }
    }
  },
  methods: {
    closeModal() {
      hideEditEventModal();

      const eventStore = useEventStore();
      eventStore.selectedEvent = null;
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
