<template>
  <span>
  <drawer :activeUnit="activeUnit" :visible="leftDrawerOpen"
    :playerTeam="playerTeam">
  </drawer>
  <q-page class="qpage">
    <div class="column">
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in cpuTeam.back"
          :unit="unit"
          :key="unit.name">
          <!-- @click.native="makeActive(unit, $event)"> -->
        </fieldplayer>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in cpuTeam.front"
          :unit="unit"
          :key="unit.name">
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
          :key="unit.name"
          :isActive="isActive(unit)"
          @click.native="makeActive(unit, $event)">
          <!-- :class="{'active': isActive(unit)}" -->
        </fieldplayer>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer v-for="unit in playerTeam.back"
          :unit="unit"
          :key="unit.name"
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
// console.log('test123')
// import Doge from 'src/loadtest/folder/file1'
// import Doge from '../loadtest/folder/file1'
// var doge = new Doge()
// doge.bark()
// import 'src/loadtest/jsload'
// import * as test from 'src/game/selectors/select'
// import 'src/game/utility/promises'
// console.log(test.player.front)
import { playerTeam, cpuTeam } from 'src/game/objects/units/unit.js'
// import { cpuTeam } from 'src/game/objects/units/unit.js'
// import unitdetail from 'src/components/unitdetail'
import fieldplayer from 'src/components/fieldplayer'
import { openURL } from 'quasar'
import drawer from '../components/drawer.vue'

export default {
  data: function () {
    return {
      playerTeam: playerTeam,
      cpuTeam: cpuTeam,
      activeUnit: [],
      leftDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
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
    fieldplayer
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
