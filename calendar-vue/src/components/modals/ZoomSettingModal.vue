<script setup lang="ts">
import ModalShadow from './ModalShadow.vue';

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import {
  MAX_CALENDAR_ZOOM,
  MIN_CALENDAR_ZOOM
} from '../../constants/settingsConstants.ts';
import { hideZoomSettingsModal } from '../../modalController.ts';
import { setZoomOnCalendarDay } from '../calendar/CalendarDay.vue';
import { setZoomOnCalendarHeader } from '../calendar/CalendarHeader.vue';
import { useZoomStore } from '../../stores/DisplayZoomStore';

function updateZoom() {
  setZoomOnCalendarHeader();
  setZoomOnCalendarDay();
}
</script>

<template>
  <modal-shadow
    :id="MODAL_IDS.ZOOM_SETTINGS_MODAL"
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
  </modal-shadow>
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
