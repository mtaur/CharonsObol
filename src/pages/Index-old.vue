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

// import { playerTeam, cpuTeam } from 'src/game/objects/units/unit.js'
import { playerTeam, cpuTeam } from 'src/game/initialize.js'
import fieldplayer from 'src/components/fieldplayer'
import drawer from '../components/drawer.vue'
import rightdrawer from '../components/rightdrawer.vue'
import Selector from 'src/game/selectors/Selector.js'

var selector = new Selector({
  playerTeam: playerTeam,
  cpuTeam: cpuTeam,
  log: [],
  logID: 0
})
selector.changeState('RoundStart')
console.log('cpuTeam', cpuTeam)
console.log('playerTeam', playerTeam)
// selector.changeState('ChooseUnit')
// selector.activeUnit = selector.game.cpuTeam.front[0]
// selector.activeSkill = cpuTeam.front[0].actions[3]
// selector.onClicks.makeActive(selector, selector.game.cpuTeam.front[0])
// selector.onClicks.pickSkill(selector, selector.game.cpuTeam.front[0].actions[3])
// selector.onClicks.execute(selector, selector.game.cpuTeam.front[0])
// selector.onClicks.makeActive(selector, selector.game.cpuTeam.back[1])
// selector.onClicks.pickSkill(selector, selector.game.cpuTeam.back[1].actions[3])
// selector.onClicks.execute(selector, selector.game.cpuTeam.back[1])
// selector.changeState('EnemyTurn')
// selector.changeState('EnemyTurn')
// selector.changeState('EnemyTurn')
// selector.changeState('EnemyTurn')

// console.log(selector.onClicks)

import { openURL } from 'quasar'

export default {
  data: function () {
    return {
      playerTeam: playerTeam,
      cpuTeam: cpuTeam,
      // activeUnit: [],
      leftDrawerOpen: true,
      selector
      // rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  props: ['rightDrawerOpen', 'rightDrawerPage'],
  methods: {
    // makeActive: function (unit, event) {
    //   this.activeUnit = [unit]
    // },
    // isActive: function (unit) {
    //   return this.activeUnit[0] ? unit.name === this.activeUnit[0].name : false
    // },
    canTarget: function (selector, unit) {
      return selector.canTarget(unit)
    },
    isActive: function (selector, unit) {
      return selector.stateData.activeUnit.id
        ? unit.id === selector.stateData.activeUnit.id
        : false
    },
    prevTarget: function (selector, unit) {
      return selector.isPrevTarg(unit)
    },
    battlefieldClick: function (selector, unit) {
      selector.getClickMode(unit).onClick(selector, unit)
      // console.log(selector.getClickMode(unit))
      // this.activeUnit = selector.stateData.activeUnit.id
      //   ? [selector.stateData.activeUnit]
      //   : []
    },
    openURL
  },
  computed: {
    SP: function () {
      return playerTeam.SP
    },
    activeUnit: function () {
      return selector.stateData.activeUnit.id
        ? [selector.stateData.activeUnit]
        : []
    },
    // isVerbose: function () {
    //   return this.selector.promptIsVerbose
    // },
    prompt: function () {
      return this.selector.promptIsVerbose ? this.selector.promptVerbose : this.selector.prompt
    },
    verboseButtonColor: function () {
      return this.selector.promptIsVerbose ? 'light-green' : 'light-green-2'
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
