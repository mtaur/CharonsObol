<template>
  <span>
  <drawer :activeUnit="activeUnit" :visible="leftDrawerOpen"
    :playerTeam="playerTeam"
    :cpuTeam="cpuTeam"
    :selector="selector"
    class="non-selectable">
  </drawer>
  <rightdrawer
  :visible="rightDrawerOpen"
  :page="rightDrawerPage"
  :selector="selector"
  class="non-selectable">
  </rightdrawer>
  <q-page class="qpage non-selectable">
    <div class="column unitrow">
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in cpuTeam.back"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(selector, unit)"
          :canTarget="canTarget(selector, unit)"
          :prevTarget="prevTarget(selector, unit)"
          :selector="selector"
          @click.native="battlefieldClick(selector, unit)"
          >
          <!-- @click.native="makeActive(unit, $event)"> -->
        </fieldplayer>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in cpuTeam.front"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(selector, unit)"
          :canTarget="canTarget(selector, unit)"
          :prevTarget="prevTarget(selector, unit)"
          :selector="selector"
          @click.native="battlefieldClick(selector, unit)"
          >
          <!-- @click.native="makeActive(unit, $event)"> -->
        </fieldplayer>
      </div>
      <!-- Divider -->
      <div class="q-pa-sm">
        <q-separator class="row" inset></q-separator>
        <div class="row text-center items-center justify-center">
          <div class="col-2">
            <q-btn
            @click="selector.promptIsVerbose = !selector.promptIsVerbose"
            :color="verboseButtonColor"
            :textColor="selector.promptIsVerbose ? 'white' : 'black'"
            label="Verbose">
            </q-btn>
          </div>
          <div class="col-10 text-center items-center justify-center text-h4">
            {{ prompt }}<!-- {{ selector.promptIsVerbose ? selector.promptVerbose : selector.prompt }} -->
          </div>
        </div>
        <q-separator class="row" inset></q-separator>
      </div>
      <!-- <q-separator inset></q-separator> -->
      <!-- <div><hr /></div>
      <div><hr /></div> -->
      <!-- Player -->
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer
          v-for="unit in playerTeam.front"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(selector, unit)"
          :canTarget="canTarget(selector, unit)"
          :prevTarget="prevTarget(selector, unit)"
          :class="{'active': isActive(selector, unit)}"
          :selector="selector"
          @click.native="battlefieldClick(selector, unit)"
          >
          <!-- @click.native="makeActive(unit, $event)" -->
        </fieldplayer>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <fieldplayer v-for="unit in playerTeam.back"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(selector, unit)"
          :canTarget="canTarget(selector, unit)"
          :prevTarget="prevTarget(selector, unit)"
          :class="{'active': isActive(selector, unit)}"
          :selector="selector"
          @click.native="battlefieldClick(selector, unit)"
          >
          <!-- :isActive="isActive(unit)" -->
          <!-- @click.native="makeActive(unit, $event)" -->
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

import { Team, Unit } from 'src/game/objects/units/Unit.js'
// import { playerTeam, cpuTeam } from 'src/game/initialize.js'
import { setup } from 'src/game/batInit.js'
import fieldplayer from 'src/components/fieldplayer'
import drawer from '../components/drawer.vue'
import rightdrawer from '../components/rightdrawer.vue'
import Selector from 'src/game/selectors/Selector.js'
import { hasIn as hasProp } from 'lodash'
//  Change this to get different battle setup!
// import { cpuJSON, playerJSON } from 'src/game/demoObjSetup.js'
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

// console.log(this.cpuJSON)
// let cpuJSON = this.$store.example.cpuJSON
// let playerJSON = this.$store.example.playerJSON
// let inputs = { cpuJSON: this.cpuJSON, playerJSON: this.playerJSON }
// let inputs = { cpuJSON: cpuJSON, playerJSON: playerJSON }
// let gameObj = setup(inputs)
// let playerTeam = gameObj.playerTeam
// let cpuTeam = gameObj.cpuTeam

// CREATE DUMMY OBJECTS TO AVOID BREAKING THE VUE TEMPLATE.
// Placeholder until real objects are generated from Vuex JSON data
// Selector is idle before the real one is assigned.
var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var selector = new Selector({
  playerTeam: playerTeam,
  cpuTeam: cpuTeam,
  log: [],
  logID: 0
})
// selector.changeState('RoundStart')

import { openURL } from 'quasar'

export default {
  data: function () {
    return {
      selector,
      playerTeam,
      cpuTeam,
      // gameObj,
      leftDrawerOpen: true // ,
      // rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  props: ['rightDrawerOpen', 'rightDrawerPage'],
  methods: {
    canTarget: function (selector, unit) {
      // return selector.canTarget(unit)
      return hasProp(selector, 'canTarget')
        ? selector.canTarget(unit)
        : false
    },
    isActive: function (selector, unit) {
      // return selector.stateData.activeUnit.id
      return hasProp(selector, 'stateData.activeUnit.id')
        ? unit.id === selector.stateData.activeUnit.id
        : false
    },
    prevTarget: function (selector, unit) {
      // return selector.isPrevTarg(unit)
      return hasProp(selector, 'promptIsVerbose')
        ? selector.isPrevTarg(unit)
        : false
    },
    battlefieldClick: function (selector, unit) {
      selector.getClickMode(unit).onClick(selector, unit)
    },
    openURL
  },
  computed: {
    SP: function () {
      return this.playerTeam.SP
    },
    activeUnit: function () {
      // return this.selector.stateData.activeUnit.id
      return hasProp(this, 'selector.stateData.activeUnit.id')
        ? [this.selector.stateData.activeUnit]
        : []
    },
    prompt: function () {
      return this.selector.promptIsVerbose ? this.selector.promptVerbose : this.selector.prompt
      // return hasProp(this, 'selector.promptIsVerbose') ? this.selector.promptVerbose : this.selector.prompt
    },
    verboseButtonColor: function () {
      return this.selector.promptIsVerbose ? 'light-green' : 'light-green-2'
      // return hasProp(this, 'selector.promptIsVerbose') ? 'light-green' : 'light-green-2'
    },
    ...mapGetters('example', ['cpuJSON', 'playerJSON'])
  },
  created: function () {
  // created: function () {
    this.gameObj = setup({
      cpuJSON: this.cpuJSON,
      playerJSON: this.playerJSON
    })
    this.playerTeam = this.gameObj.playerTeam
    this.cpuTeam = this.gameObj.cpuTeam
    console.log('created?')
    this.selector = new Selector({
      playerTeam: this.playerTeam,
      cpuTeam: this.cpuTeam,
      log: [],
      logID: 0
    })
    this.selector.changeState('RoundStart')
    console.log('new selector???')
    console.log(this.selector)
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
    flex: 1 1;
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
