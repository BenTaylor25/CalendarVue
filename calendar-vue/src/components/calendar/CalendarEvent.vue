<script setup lang="ts">
import { CalendarEventModel } from '../../models/CalendarEventModel';
import { calcEventStyle } from '../../helpers/dynCalendarEventOffset';
import { showEditEventModal } from '../../modalController.ts';
</script>

<template>
  <div
    class="calendar-event"
    :style="calcEventStyle($props.calendarEventModel)"
    @click="eventClicked()"
  >
    <p>{{calendarEventModel.name}}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    calendarEventModel: {
      type: CalendarEventModel,
      required: true
    }
  },
  methods: {
    eventClicked() {
      showEditEventModal();
    }
  }
}
</script>

<style lang="scss">
.calendar-event {
  position: absolute;
  height: 5rem;
  background-color: lime;

  p {
    color: black;
  }
}
</style>
