<template>
  <span>
    <newUnitDrawer :key="selector.updateKey" :activeUnit="activeUnit" :visible="leftDrawerOpen"
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
        <h4>Create a party before continuing:</h4>
        <div v-if="playerTeam.all.length > 0" class="q-pa-sm">
          <q-btn @click="batInit(playerJSON, cpuJSON, scrolls, teamConfig)" color="amber-5" size="lg">Begin custom battle!</q-btn>
        </div>
      </div>
      <div class="column unitrow">
        <div class="row justify-center items-stretch">
          <h6>Front</h6>
        </div>
        <div class="row justify-center items-stretch unitrow">
          <div v-if="playerTeam.front.length < 4 && playerTeam.SP >= 15" class="col-3 q-pa-lg">
            <q-btn @click="addJaqen('front')" color="green" size="xl">Add unit! (15 SP)</q-btn>
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
          <div v-if="playerTeam.back.length < 4 && playerTeam.SP >= 15" class="col-3 q-pa-lg">
            <q-btn @click="addJaqen('back')" color="green" size="xl">Add unit! (15 SP)</q-btn>
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
// selector.showStats = true
// selector.showConsumables = false
// selector.showAbilities = true

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
      teamConfig: {
        playerTeam: {},
        cpuTeam: {}
      },
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
      if (this.playerTeam.SP >= 15) {
        let unit = new UnitTemplate.LIB.HERO({ soulsArr: [], itemsArr: [], pos: row, side: 'player', lvlUp: {} }, { playerTeam, cpuTeam })
        playerTeam.deploy(unit)
        unit.pos = row
        this.selector.stateData.activeUnit = unit
        // this.playerTeam.front.push(new UnitTemplate.LIB.HERO({ soulsArr: [], itemsArr: [], POS: 'front' }, { playerTeam, cpuTeam }))
      }
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
    ...mapMutations('currentTeams', ['playerJSON', 'cpuJSON', 'teamConfig']),
    batInit: function (playerJSON, cpuJSON, scrolls, teamConfig) {
      this.$store.commit('currentTeams/scrollJSON', scrolls)
      this.$store.commit('currentTeams/playerJSON', playerJSON)
      this.$store.commit('currentTeams/cpuJSON', cpuJSON)
      this.$store.commit('currentTeams/teamConfig', teamConfig)
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
          pos: '',
          side: 'player'
        }

        let obj = {}
        obj.NAME = 'HERO' // unit.NAME
        obj.passedObj = passedObj

        passedObj.POS = unit.pos
        passedObj.pos = unit.pos
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
      return this.cpuJSONRatslime
    },
    scrolls: function () {
      // return this.playerTeam.inventory
      let scrolls = {}
      for (let scrollName in this.playerTeam.inventory) {
        scrolls[scrollName] = this.playerTeam.inventory[scrollName]
      }
      return scrolls
    },
    ...mapGetters('ratslimeDemo', ['cpuJSONRatslime'])
  },
  created: function () {
    // this.addJaqen('front')
    this.teamConfig.playerTeam = {
      SPCap: 500,
      SP: 125
      // SPCap: 750,
      // RSP: 3000
    }
    this.teamConfig.cpuTeam = {
      SPCap: 500,
      SP: 125 // 150 // 200
    }
    this.playerTeam.SPCap = this.teamConfig.playerTeam.SPCap
    this.playerTeam.SP = this.teamConfig.playerTeam.SP
  },
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
