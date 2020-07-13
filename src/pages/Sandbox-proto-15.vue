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
        <div class="row q-pa-md">
          <div class="col-3"></div>
          <div class="q-gutter-md col-6">
            <q-carousel
              v-model="slide"
              transition-prev="jump-right"
              transition-next="jump-left"
              swipeable
              animated
              control-color="white"
              prev-icon="arrow_left"
              next-icon="arrow_right"
              navigation-icon="radio_button_unchecked"
              navigation
              padding
              arrows
              height="400px"
              class="bg-grey text-white shadow-1 rounded-borders"
            >
              <q-carousel-slide name="0" class="column no-wrap flex-center">
                <q-card class="bg-grey-9 text-white centerbox">
                  <q-card-section>
                    <span class="text-h6">
                      NECROMANCY COOL TIPS
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col-3 q-pa-sm">
                        <q-img src="statics/gameIcons/souls/YOLT.png"></q-img>
                      </div>
                      <div class="col-9 q-pa-sm">
                        <div>
                          <span class="text-h6">
                            YOLT the Metanecromancer, raiser of the un-undead
                          </span>
                          <span class="text-italic text-body1">
                            is a unique character whose RAISE skill comes with many
                            unique balancing mechanisms. Read more to make the most of it.
                          </span>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <!-- <q-icon name="style" size="56px" />
                <div class="q-mt-md text-center">
                  asdfasdf
                </div> -->
              </q-carousel-slide>
              <q-carousel-slide name="1" class="column no-wrap flex-center">
                <q-card class="bg-grey-9 text-white centerbox">
                  <q-card-section>
                    <span class="text-h6">
                      NECROMANCY COOL TIPS
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-italic text-body1">
                      When YOLT summons a ZOMBIE, that ZOMBIE
                      has FREE, NON-TRANSFERABLE SP to spend on its base stats.
                      You should probably spend some points in MELEE, RANGED, MAGIC, and/or
                      MP right away. Sometimes hoarding some SP for later turns is an option.
                    </div>
                  </q-card-section>
                </q-card>
                <!-- <q-icon name="style" size="56px" />
                <div class="q-mt-md text-center">
                  asdfasdf
                </div> -->
              </q-carousel-slide>
              <q-carousel-slide name="2" class="column no-wrap flex-center">
                <!-- <q-icon name="live_tv" size="56px" />
                <div class="q-mt-md text-center">
                  xyz
                </div> -->
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
                  <q-card-section>
                    <div class="text-italic text-body1">
                      Budgeting just enough SP into MP to cast the skills you plan to use is
                      an important part of necromancing efficiently.  Alternately, you may
                      find it effective to raise a ZOMBIE with the right stat configuration
                      to use your consumables.
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="3" class="column no-wrap flex-center">
                <q-card class="bg-grey-9 text-white centerbox">
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
                      regeneration effects, so don't bother!  Spending SP on a ZOMBIE's HP,
                      will add maximum AND current HP, but getting too much before you need
                      it will accelerate the DECAY with no benefit to you.
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-italic text-body1">
                      Also, damage dealt by a ZOMBIE is converted to POISON, while incoming
                      damage is treated normally.
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="4" class="column no-wrap flex-center">
                <!-- <q-icon name="layers" size="56px" />
                <div class="q-mt-md text-center">
                  abc
                </div> -->
                <q-card class="bg-grey-9 text-white centerbox">
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
                      ZOMBIE units!  They spend INITIATIVE but contribute none! (continued)
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="5" class="column no-wrap flex-center">
                <!-- <q-icon name="layers" size="56px" />
                <div class="q-mt-md text-center">
                  abc
                </div> -->
                <q-card class="bg-grey-9 text-white centerbox">
                  <q-card-section>
                    <span class="text-h6">
                      NECROMANCY COOL TIPS
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-italic text-body1">
                      Each unit contributes three "initiative marbles".  A major action consumes two marbles,
                      and a minor action consumes one. When the total remaining initiative is 0, no more actions
                      can be taken, even when action points are available.  A unit with 0 initiative contributes
                      three "initiative marble" of value 0.  So when you get down to your last three marbles, it
                      is impossible to use any of them. As long as you have at least 1 initiative total, you may perform
                      actions of any type.  For example, if you have a minor action on one unit and both actions on
                      a zombie, the zombie may use a "BOTH" type action, which will only leave the remaining minor action
                      unused.
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="6" class="column no-wrap flex-center">
                <!-- <q-icon name="layers" size="56px" />
                <div class="q-mt-md text-center">
                  abc
                </div> -->
                <q-card class="bg-grey-9 text-white centerbox">
                  <q-card-section>
                    <span class="text-h6">
                      NECROMANCY COOL TIPS
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-italic text-body1">
                      The initiative problem for ZOMBIEs gets worse if you summon more
                      at the same time, making it impractical to rush damage this way.
                      You do NOT increase the total amount of actions in this way, so you
                      it can be impractical unless you intend to leave actions and/or
                      get good use out of minor actions, such as by GUARDing.
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="7" class="column no-wrap flex-center">
                <q-card class="bg-grey-9 text-white centerbox">
                  <q-card-section>
                    <span class="text-h6">
                      NECROMANCY COOL TIPS
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-italic text-body1">
                      It is rumored that there are legendary blends of COFFEE so strong that even a
                      ZOMBIE will benefit from it.
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
          </div>
          <div class="col-3"></div>
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
      slide: '0'
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
