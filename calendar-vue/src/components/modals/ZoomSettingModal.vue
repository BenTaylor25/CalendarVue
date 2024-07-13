<script setup lang="ts">
import { ref, Ref } from 'vue';

import { MODAL_IDS } from '../../constants/modalConstants';
import { setZoomOnCalendarHeader } from '../calendar/CalendarHeader.vue';
import { setZoomOnCalendarDay } from '../calendar/CalendarDay.vue';

function updateZoom() {
  setZoomOnCalendarHeader(zoomSettingValue.value);
  setZoomOnCalendarDay(zoomSettingValue.value);
}

</script>

<template>
  <div :id="MODAL_IDS.ZOOM_SETTINGS_MODAL">
    <h1>Zoom:</h1>
    <input type="range" min="1" max="20" v-model="zoomSettingValue" @input="updateZoom" />
    <p>{{ zoomSettingValue }}</p>
  </div>
</template>

<script lang="ts">
const zoomSettingValue: Ref<number> = ref(3);
</script>

<style lang="scss">

#zoom-settings-modal {
  display: none;
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

  &.show {
    display: flex;
  }

  h1, p {
    color: black;
  }
}

</style>
