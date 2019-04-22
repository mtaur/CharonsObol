<template>
  <span>
  <drawer :activeUnit="activeUnit" :visible="leftDrawerOpen"
    :playerTeam="playerTeam">
  </drawer>
  <rightdrawer :visible="rightDrawerOpen"></rightdrawer>
  <q-page class="qpage non-selectable">
    <div class="column">
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in cpuTeam.back"
          :unit="unit"
          :key="unit.id">
          <!-- @click.native="makeActive(unit, $event)"> -->
        </fieldplayer>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in cpuTeam.front"
          :unit="unit"
          :key="unit.id">
          <!-- @click.native="makeActive(unit, $event)"> -->
        </fieldplayer>
      </div>
      <!-- Divider -->
      <div><hr /></div>
      <!-- Player -->
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in playerTeam.front"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(unit)"
          @click.native="makeActive(unit, $event)">
          <!-- :class="{'active': isActive(unit)}" -->
        </fieldplayer>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer v-for="unit in playerTeam.back"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(unit)"
          @click.native="makeActive(unit, $event)">
          <!-- :class="{'active': isActive(unit)}" -->
        </fieldplayer>
      </div>
    </div>
  </q-page>
  </span>
</template>

<style>
  h4 { margin: 20px 0; }
</style>

<script>

import { playerTeam, cpuTeam } from 'src/game/objects/units/unit.js'
import fieldplayer from 'src/components/fieldplayer'
import drawer from '../components/drawer.vue'
import rightdrawer from '../components/rightdrawer.vue'

import { openURL } from 'quasar'

export default {
  data: function () {
    return {
      playerTeam: playerTeam,
      cpuTeam: cpuTeam,
      activeUnit: [],
      leftDrawerOpen: true
      // rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  props: ['rightDrawerOpen'],
  methods: {
    makeActive: function (unit, event) {
      this.activeUnit = [unit]
    },
    isActive: function (unit) {
      return this.activeUnit[0] ? unit.name === this.activeUnit[0].name : false
    },
    openURL
  },
  computed: {
    SP: function () {
      return playerTeam.SP
    }
  },
  name: 'PageIndex',
  components: { // unitdetail,
    drawer,
    fieldplayer,
    rightdrawer
  }
}
</script>

<style scoped>
  .gamerow {
    /* flex-grow: 1; */
    /* height: 400px; */
  }
  .qpage {
    /* height: 85vh; */
    display: flex;
    position: relative;
  }
  .unitrow {
    /* flex-basis: 20vh; */
    flex: 1 1 20vh;
    /* overflow-y: auto; */
  }
  /* .column {
    flex-shrink: 1;
  } */
</style>
