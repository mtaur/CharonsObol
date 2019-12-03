<template>
  <span>
  <newUnitDrawer :activeUnit="activeUnit" :visible="leftDrawerOpen"
    :playerTeam="playerTeam"
    :cpuTeam="cpuTeam"
    :selector="selector"
    class="non-selectable">
  </newUnitDrawer>
  <rightdrawer
    :visible="rightDrawerOpen"
    :page="rightDrawerPage"
    :selector="selector"
    class="non-selectable">
  </rightdrawer>
  <!-- <q-page class="qpage column align-center items-center justify-center"> -->
  <q-page class="qpage column non-selectable">
    <div class="align-center column items-center justify-center">
      <div class="row items-center">
        <div class="col-2"></div>
        <div class="col-8">
          <h4>Welcome to Charon's Obol!</h4>
          <!-- <div class="text-h6 q-pa-sm">
            I'm working on the pre-game and page routing.  Click the button below to start. I've pre-leveled the characters to some extent.  This is to practice passing data into constructors so I can save/load and transition more easily as the game grows.
          </div> -->
        </div>
        <div class="col-2"></div>
      </div>
      <div class="q-pa-sm">
        <q-btn to="battle" color="green" size="lg">Start battle with random auto party.</q-btn>
      </div>
      <q-separator></q-separator>
      <h4>...or create custom party:</h4>
      <!-- <div class="text-h6 q-pa-sm" style="width:66%">
        Notice how the URL changes when you click the button.  This will make it possible to use the back button in the future. The game state will store some information that should prevent jumping "forward" nonsensically with manual URLs.  When a manual URL is used, it will be scrutinized and the game will roll back or forward to the correct state.
      </div>
      <div class="text-h6 q-pa-sm" style="width:66%">
        In-game interactions will create data points which can be loaded through the proper URLs.
      </div>
      <div class="text-body1 q-pa-sm" style="width:66%">
        (That's the idea anyway)
      </div> -->
      <div v-if="playerTeam.all.length > 0" class="q-pa-sm">
        <q-btn @click="batInit(playerJSON, cpuJSON)" color="amber-5" size="lg">Begin custom battle!</q-btn>
      </div>
    </div>
    <div class="column unitrow">
      <div class="row justify-center items-stretch">
        <h6>Front</h6>
      </div>
      <div class="row justify-center items-stretch unitrow">
        <div v-if="playerTeam.front.length < 4" class="col-3 q-pa-lg">
          <q-btn @click="addJaqen('front')" color="green" size="xl">Add unit!</q-btn>
        </div>
        <newPlayer v-for="unit in playerTeam.front"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(selector, unit)"
          :class="{'active': isActive(selector, unit)}"
          :selector="selector"
          @click.native="battlefieldClick(selector, unit)"
          >
          <!-- :isActive="isActive(unit)" -->
          <!-- @click.native="makeActive(unit, $event)" -->
        </newPlayer>
        <!-- {{ unit.name }} -->
      </div>
    </div>
    <div class="row justify-center items-stretch">
      <h6>Back</h6>
    </div>
    <div class="column unitrow">
      <div class="row justify-center items-stretch unitrow">
        <div v-if="playerTeam.back.length < 4" class="col-3 q-pa-lg">
          <q-btn @click="addJaqen('back')" color="green" size="xl">Add unit!</q-btn>
        </div>
        <newPlayer v-for="unit in playerTeam.back"
          :unit="unit"
          :key="unit.id"
          :isActive="isActive(selector, unit)"
          :class="{'active': isActive(selector, unit)}"
          :selector="selector"
          @click.native="battlefieldClick(selector, unit)"
        >
        <!-- :isActive="isActive(unit)" -->
        <!-- @click.native="makeActive(unit, $event)" -->
        </newPlayer>
      </div>
    </div>
  </q-page>
    <!-- <div>
    </div> -->
  <!-- </div> -->
  </span>
</template>

<style>
  /* h4 { margin: 20px 0; } */
</style>

<script>

import newPlayer from 'src/components/newPlayer'
import { Unit, Team } from 'src/game/objects/units/Unit.js'
import { UnitTemplate } from 'src/game/objects/units/templates/UnitTemplate.js'
import Selector from 'src/game/selectors/Selector.js'

let playerTeam = new Team(Unit.SIDE.PLAYER)
let cpuTeam = new Team(Unit.SIDE.CPU)
var selector = new Selector({
  playerTeam: playerTeam,
  cpuTeam: cpuTeam,
  log: [],
  logID: 0
})
selector.changeState('ManageTeam')

// import { playerTeam, cpuTeam } from 'src/game/objects/units/unit.js'
// import { playerTeam, cpuTeam } from 'src/game/initialize.js'
// import fieldplayer from 'src/components/fieldplayer'
import { hasIn as hasProp } from 'lodash'
import newUnitDrawer from '../components/newUnitDrawer.vue'
import rightdrawer from '../components/rightdrawer.vue'
import { Stat } from 'src/game/objects/units/Stat.js'
// import Selector from 'src/game/selectors/Selector.js'
//
// selector.changeState('RoundStart')
// console.log('cpuTeam', cpuTeam)
// console.log('playerTeam', playerTeam)
//
// import { openURL } from 'quasar'
import { mapGetters, mapMutations } from 'vuex'
// import { mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      playerTeam: playerTeam,
      cpuTeam: cpuTeam,
      // activeUnit: [],
      leftDrawerOpen: true,
      selector: selector // ,
      // rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  // components: ['fieldplayer'],
  // props: [],
  props: ['rightDrawerOpen', 'rightDrawerPage'],
  methods: {
    addJaqen: function (row) {
      let unit = new UnitTemplate.LIB.HERO({ soulsArr: [], itemsArr: [], pos: row, side: 'player', lvlUp: {} }, { playerTeam, cpuTeam })
      playerTeam.deploy(unit)
      this.selector.stateData.activeUnit = unit
      // this.playerTeam.front.push(new UnitTemplate.LIB.HERO({ soulsArr: [], itemsArr: [], POS: 'front' }, { playerTeam, cpuTeam }))
    },
    isActive: function (selector, unit) {
      return selector.stateData.activeUnit.id
        ? unit.id === selector.stateData.activeUnit.id
        : false
    },
    battlefieldClick: function (selector, unit) {
      selector.stateData.activeUnit = unit
      // selector.getClickMode(unit).onClick(selector, unit)
    },
    ...mapMutations('currentTeams', ['playerJSON', 'cpuJSON']),
    batInit: function (playerJSON, cpuJSON) {
      this.$store.commit('currentTeams/playerJSON', playerJSON)
      this.$store.commit('currentTeams/cpuJSON', cpuJSON)
      this.$router.push({ name: 'battle2' })
    }
  },
  // props: ['rightDrawerOpen', 'rightDrawerPage'],
  // methods: {
  //   canTarget: function (selector, unit) {
  //     return selector.canTarget(unit)
  //   },
  //   prevTarget: function (selector, unit) {
  //     return selector.isPrevTarg(unit)
  //   },
  //   openURL
  // },
  computed: {
    activeUnit: function () {
      // return this.selector.stateData.activeUnit.id
      return hasProp(this, 'selector.stateData.activeUnit.id')
        ? [this.selector.stateData.activeUnit]
        : []
    },
    playerJSON: function () {
      let playerJSON = []
      for (let index in this.playerTeam.all) {
        let unit = this.playerTeam.all[index]
        let passedObj = {
          itemsArr: [],
          soulsArr: [],
          lvlUp: {},
          POS: '',
          side: 'player'
        }

        let obj = {}
        obj.NAME = 'HERO' // unit.NAME
        obj.passedObj = passedObj

        passedObj.POS = unit.pos
        unit.items.forEach((item) => passedObj.itemsArr.push(item.NAME))
        unit.souls.forEach((soul) => passedObj.soulsArr.push(soul.NAME))
        for (let statName in unit.baseStats) {
          let startCounter = new Stat.LIB[statName]().counters
          // passedObj.lvlUp[statName] = unit.baseStats[statName].counters - unit.baseStats[statName].start
          passedObj.lvlUp[statName] = unit.baseStats[statName].counters - startCounter
        }
        playerJSON.push(obj)
      }
      return playerJSON
    },
    cpuJSON: function () {
      return this.cpuJSON0
    },
    ...mapGetters('example', ['cpuJSON0'])
  },
  //   SP: function () {
  //     return playerTeam.SP
  //   },
  //   activeUnit: function () {
  //     return selector.stateData.activeUnit.id
  //       ? [selector.stateData.activeUnit]
  //       : []
  //   },
  //   prompt: function () {
  //     return this.selector.promptIsVerbose ? this.selector.promptVerbose : this.selector.prompt
  //   },
  //   verboseButtonColor: function () {
  //     return this.selector.promptIsVerbose ? 'light-green' : 'light-green-2'
  //   }
  // },
  name: 'PageIndex',
  components: { // unitdetail,
    // drawer,
    // fieldplayer
    newPlayer,
    newUnitDrawer,
    rightdrawer
  }
}
</script>

<style scoped>
  .unitrow {
    /* flex-basis: 20vh; */
    flex: 1 1 20vh;
    /* overflow-y: auto; */
  }
  .qpage {
    /* height: 85vh; */
    display: flex;
    position: relative;
    flex: 1 1;
  }
</style>
