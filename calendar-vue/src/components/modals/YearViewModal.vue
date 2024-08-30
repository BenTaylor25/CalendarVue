<script setup lang="ts">

import { MODAL_IDS } from '../../constants/modalConstants.ts';
import { hideYearViewModal } from '../../modalController.ts';
import { getYearViewMonthDates } from '../../helpers/getMonthViewDates.ts';

import ModalShadow from './ModalShadow.vue';
import CalendarMonth from '../calendar/month-view/CalendarMonth.vue';
</script>

<template>
  <modal-shadow
    :id="MODAL_IDS.YEAR_VIEW_MODAL"
    @click="hideYearViewModal()"
  >

  <div
    id="year-view-modal-content"
    @click.stop
  >

    <h1>Year</h1>

    <div id="month-box-container">

      <div class="month-box" v-for="month in getYearViewMonthDates(2024)">
        <calendar-month
          :weeksSource="month"
        />
      </div>

    </div>

  </div>

  </modal-shadow>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
#year-view-modal-content {
  position: absolute;
  flex-direction: column;
  background-color: darkslategray;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  top: 10%;
  left: 10%;
  bottom: 10%;
  right: 10%;
  min-height: 10rem;

  &.show {
    display: flex;
  }

  h1 {
    color: black;
  }

  #month-box-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 85%;

    .month-box {
      display: flex;
      align-items: center;
      border: 1px solid black;
      width: 25%;
      height: 33%;
    }
  }
}
</style>
