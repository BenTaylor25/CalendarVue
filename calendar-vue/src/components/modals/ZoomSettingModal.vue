<script setup lang="ts">
import { MODAL_IDS } from '../../constants/modalConstants';
import { MAX_CALENDAR_ZOOM, MIN_CALENDAR_ZOOM } from '../../constants/settingsConstants';
import { setZoomOnCalendarHeader } from '../calendar/CalendarHeader.vue';
import { setZoomOnCalendarDay } from '../calendar/CalendarDay.vue';
import { useZoomStore } from '../../stores/DisplayZoomStore';
import { hideZoomSettingsModal } from '../../modalController';

function updateZoom() {
  setZoomOnCalendarHeader();
  setZoomOnCalendarDay();
}
</script>

<template>
  <div
    :id="MODAL_IDS.ZOOM_SETTINGS_MODAL"
    class="modal-shadow"
    @click="hideZoomSettingsModal()"
  >

    <div
      id="zoom-settings-modal-content"
      @click.stop
    >

      <h1>Zoom:</h1>

      <input
        type="range"
        :min="MIN_CALENDAR_ZOOM"
        :max="MAX_CALENDAR_ZOOM"
        step="0.125"
        v-model="useZoomStore().zoom"
        @input="updateZoom"
      />

      <p>{{ useZoomStore().zoom }}</p>

    </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">

#zoom-settings-modal-content {
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
