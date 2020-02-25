<template>
  <span>
    <!-- <newUnitDrawer :key="selector.updateKey" :activeUnit="activeUnit" :visible="leftDrawerOpen"
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
    </rightdrawer> -->
    <q-page class="qpage column non-selectable">
      <div class="align-center column items-center justify-center">
        <div class="row items-center">
          <div class="col-2"></div>
          <div class="col-8">
            <h4>Welcome to Charon's Obol!</h4>
          </div>
          <div class="col-2"></div>
        </div>
        <div class="row items-center items-stretch q-pa-xs">
          <div class="col-3">
            <q-card class="bg-grey-10 text-white centerbox">
              <q-card-section>
                <span class="text-h6">
                  NECROMANCY COOL TIPS
                </span>
              </q-card-section>
              <q-card-section>
                <div class="text-italic text-body1">
                  When YOLT summons a ZOMBIE, that ZOMBIE
                  has FREE, NON-TRANSFERABLE SP to spend on its base stats.
                  You should probably spend points right away, except for HP and INIT.
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-3">
            <q-card class="bg-grey-9 text-white centerbox">
              <q-card-section>
                <span class="text-h6">
                  NECROMANCY COOL TIPS
                </span>
              </q-card-section>
              <q-card-section>
                <div class="text-italic text-body1">
                  The ZOMBIE has ALL of the active abilities of its summoner EXCEPT for
                  the RAISE ability (for balance reasons which should be obvious).
                  Try experimenting with an additional soul or two in the sandbox setups!
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-3">
            <q-card class="bg-grey-8 text-white centerbox">
              <q-card-section>
                <span class="text-h6">
                  NECROMANCY COOL TIPS
                </span>
              </q-card-section>
              <q-card-section>
                <div class="text-italic text-body1">
                  ZOMBIES have no INITIATIVE of their own, and their INIT is 0, period.
                  Essentially, every action taken by a ZOMBIE is "borrowed" from an ally with
                  non-zero INITIATIVE. In general, turns consume team INITIATIVE, and you'd normally
                  run out of INITIATIVE and TURN POINTS at the same time.  Not so with summoned
                  ZOMBIE units!  They spend INITIATIVE but contribute none!
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-3">
            <q-card class="bg-grey-7 text-white centerbox">
              <!-- <div> -->
              <q-card-section>
                <span class="text-h6">
                  NECROMANCY COOL TIPS
                </span>
              </q-card-section>
              <q-card-section>
                <div class="text-italic text-body1">
                  A summoned ZOMBIE will DECAY at the start of each round.  This means
                  that their POISON amount will be set to match their CURRENT HP, unless
                  they already have at least that much poison.  This also cancels
                  regeneration effects, so don't bother!
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-italic text-body1">
                  Also, damage dealt by a ZOMBIE is converted to POISON, while incoming
                  damage is treated normally.
                </div>
              </q-card-section>
              <!-- </div> -->
            </q-card>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-2"></div>
          <div class="col-8">
            <q-card>
              <!-- <div> -->
                <q-card-section>
                <span class="text-h6">
                  COOL TIP
                </span>
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                  <div class="text-italic text-body1">
                    SP is refunded whenever you use a consumable item or an allied unit dies.  During your turn, you can reinvest SP into stat points!
                  </div>
                </q-card-section>
              <!-- </div> -->
            </q-card>
          </div>
          <div class="col-2"></div>
        </div>
        <div class="row">
          <div class="q-pa-sm q-gutter-sm col-4">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <q-card-section>
                  <div class="text-h5">
                    Cerberus fight, whoa.
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-btn to="sandbox/sandboxcerberus" color="red" size="lg">Start!</q-btn>
                </q-card-section>
                <q-card-section>
                  <div class="text-body1">
                    Cerberus will lose its copies of souls, skills, and passives whenever that ally dies, as well as some additional stat multipliers.
                  </div>
                </q-card-section>
                <!-- <div class="q-pa-sm text-h6">
                </div> -->
              </div>
            </q-card>
          </div>
          <!-- <div class="q-pa-sm q-gutter-sm col-4">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <h5>
                  Placeholder.
                </h5>
              </div>
            </q-card>
          </div> -->
          <div class="q-pa-sm q-gutter-sm col-4">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <q-card-section>
                  <div class="text-h5">
                    Ratslime empress boss fight, whoa.
                  </div>
                </q-card-section>
                <q-card-section>
                  <div>
                    <q-btn to="sandbox/ratslimeboss" color="red" size="lg">Start!</q-btn>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="text-body1">
                    The empress can FESTER when below 100 POISON, and can BLIGHT when above 100 POISON. Just like all ratslimes, the Empress converts 50% of damage to POISON, incoming and outgoing.
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="q-pa-sm q-gutter-sm col-3">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <h5>
                  Sandbox setup for early-game battle.
                </h5>
                <q-btn to="sandbox/early" color="green" size="lg">Start!</q-btn>
              </div>
            </q-card>
          </div>
          <div class="q-pa-sm q-gutter-sm col-3">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <h5>
                  Sandbox setup for mid-game battle.
                </h5>
                <q-btn to="sandbox/mid" color="orange" size="lg">Start!</q-btn>
              </div>
            </q-card>
          </div>
          <div class="q-pa-sm q-gutter-sm col-3">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <h5>
                  Sandbox setup for late-game battle.
                </h5>
                <q-btn to="sandbox/late" color="yellow" size="lg">Start!</q-btn>
              </div>
            </q-card>
          </div>
          <div class="q-pa-sm q-gutter-sm col-3">
            <q-card>
              <div class="q-pa-sm align-center column items-center justify-center centerbox">
                <h5>
                  Late-game, random party.
                </h5>
                <div>
                </div>
                <q-btn to="battle" color="red" size="lg">Start!</q-btn>
                <div>
                  (Synergies not guaranteed.  No refunds.)
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <!-- <q-separator></q-separator> -->
        <!-- <h4>...or create custom party:</h4>
        <div v-if="playerTeam.all.length > 0" class="q-pa-sm">
          <q-btn @click="batInit(playerJSON, cpuJSON, scrolls, config)" color="amber-5" size="lg">Begin custom battle!</q-btn>
        </div> -->
      </div>
      <!-- <div class="column unitrow">
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
          </newPlayer>
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
          </newPlayer>
        </div>
      </div> -->
    </q-page>
  </span>
</template>

<style>
  /* h4 { margin: 20px 0; } */
</style>

<script>

// import newPlayer from 'src/components/newPlayer'
// import { Unit, Team } from 'src/game/objects/units/Unit.js'
// import { UnitTemplate } from 'src/game/objects/units/templates/UnitTemplate.js'
// import Selector from 'src/game/selectors/Selector.js'

// let playerTeam = new Team(Unit.SIDE.PLAYER)
// let cpuTeam = new Team(Unit.SIDE.CPU)
// var selector = new Selector({
//   playerTeam: playerTeam,
//   cpuTeam: cpuTeam,
//   log: [],
//   logID: 0
// })
// selector.changeState('ManageTeam')
// selector.showStats = true
// selector.showConsumables = false
// selector.showAbilities = true

// import { playerTeam, cpuTeam } from 'src/game/objects/units/unit.js'
// import { playerTeam, cpuTeam } from 'src/game/initialize.js'
// import fieldplayer from 'src/components/fieldplayer'
// import { hasIn as hasProp } from 'lodash'
// import newUnitDrawer from '../components/newUnitDrawer.vue'
// import rightdrawer from '../components/rightdrawer.vue'
// import { Stat } from 'src/game/objects/units/Stat.js'
// import Selector from 'src/game/selectors/Selector.js'
//
// selector.changeState('RoundStart')
// console.log('cpuTeam', cpuTeam)
// console.log('playerTeam', playerTeam)
//
// import { openURL } from 'quasar'
// import { mapGetters, mapMutations } from 'vuex'
// import { mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      // playerTeam: playerTeam,
      // cpuTeam: cpuTeam,
      // config: {
      //   playerTeam: {},
      //   cpuTeam: {}
      // },
      // activeUnit: [],
      // leftDrawerOpen: true,
      // selector: selector // ,
      // rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  // components: ['fieldplayer'],
  // props: [],
  props: ['rightDrawerOpen', 'rightDrawerPage'],
  methods: {
    // addJaqen: function (row) {
    //   let unit = new UnitTemplate.LIB.HERO({ soulsArr: [], itemsArr: [], pos: row, side: 'player', lvlUp: {} }, { playerTeam, cpuTeam })
    //   playerTeam.deploy(unit)
    //   this.selector.stateData.activeUnit = unit
    //   // this.playerTeam.front.push(new UnitTemplate.LIB.HERO({ soulsArr: [], itemsArr: [], POS: 'front' }, { playerTeam, cpuTeam }))
    // },
    // isActive: function (selector, unit) {
    //   return selector.stateData.activeUnit.id
    //     ? unit.id === selector.stateData.activeUnit.id
    //     : false
    // },
    // battlefieldClick: function (selector, unit) {
    //   selector.stateData.activeUnit = unit
    //   // selector.getClickMode(unit).onClick(selector, unit)
    // },
    // ...mapMutations('currentTeams', ['playerJSON', 'cpuJSON', 'teamConfig']),
    // batInit: function (playerJSON, cpuJSON, scrolls, teamConfig) {
    //   this.$store.commit('currentTeams/scrollJSON', scrolls)
    //   this.$store.commit('currentTeams/playerJSON', playerJSON)
    //   this.$store.commit('currentTeams/cpuJSON', cpuJSON)
    //   this.$store.commit('currentTeams/teamConfig', teamConfig)
    //   this.$router.push({ name: 'battle2' })
    // }
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
    // activeUnit: function () {
    //   // return this.selector.stateData.activeUnit.id
    //   return hasProp(this, 'selector.stateData.activeUnit.id')
    //     ? [this.selector.stateData.activeUnit]
    //     : []
    // },
    // playerJSON: function () {
    //   let playerJSON = []
    //   for (let index in this.playerTeam.all) {
    //     let unit = this.playerTeam.all[index]
    //     let passedObj = {
    //       itemsArr: [],
    //       soulsArr: [],
    //       lvlUp: {},
    //       POS: '',
    //       side: 'player'
    //     }
    //
    //     let obj = {}
    //     obj.NAME = 'HERO' // unit.NAME
    //     obj.passedObj = passedObj
    //
    //     passedObj.POS = unit.pos
    //     unit.items.forEach((item) => passedObj.itemsArr.push(item.NAME))
    //     unit.souls.forEach((soul) => passedObj.soulsArr.push(soul.NAME))
    //     for (let statName in unit.baseStats) {
    //       let startCounter = new Stat.LIB[statName]().counters
    //       // passedObj.lvlUp[statName] = unit.baseStats[statName].counters - unit.baseStats[statName].start
    //       passedObj.lvlUp[statName] = unit.baseStats[statName].counters - startCounter
    //     }
    //     playerJSON.push(obj)
    //   }
    //   return playerJSON
    // },
    // cpuJSON: function () {
    //   return this.cpuJSON0
    // },
    // scrolls: function () {
    //   // return this.playerTeam.inventory
    //   let scrolls = {}
    //   for (let scrollName in this.playerTeam.inventory) {
    //     scrolls[scrollName] = this.playerTeam.inventory[scrollName]
    //   }
    //   return scrolls
    // } // ,
    // ...mapGetters('example', ['cpuJSON0'])
  },
  created: function () {
    // this.addJaqen('front')
    // this.config.playerTeam = {
    //   SPCap: 750,
    //   // RSP: 100000
    //   SP: 3000
    // }
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
    // newPlayer,
    // newUnitDrawer,
    // rightdrawer
  }
}
</script>

<style scoped>
  .unitrow {
    /* flex-basis: 20vh; */
    flex: 1 1 20vh;
    /* overflow-y: auto; */
  }
  .centerbox {
    height: 300px;
  }
  /* .smlbox {
    height: 100px;
  } */
  .qpage {
    /* height: 85vh; */
    display: flex;
    position: relative;
    flex: 1 1;
  }
</style>
