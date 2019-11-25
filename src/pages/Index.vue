<template>
  <div class="column align-center items-center justify-center" style="height:90vh">
    <div class="row items-center">
      <div class="col-2"></div>
      <div class="col-8">
        <h2>Welcome to Charon's Obol!</h2>
        <div class="text-h4 q-pa-sm">
          I'm working on the pre-game and page routing.  Click the button below to start.
        </div>
        <div class="text-h4 q-pa-sm">
          I've pre-leveled the characters to some extent.  This is to practice passing data into constructors so I can save/load and transition more easily as the game grows.
        </div>
      </div>
    </div>
    <div class="q-pa-lg">
      <q-btn to="battle" color="green" size="xl">Start!</q-btn>
    </div>
    <div class="text-h6 q-pa-sm" style="width:66%">
      Notice how the URL changes when you click the button.  This will make it possible to use the back button in the future. The game state will store some information that should prevent jumping "forward" nonsensically with manual URLs.  When a manual URL is used, it will be scrutinized and the game will roll back or forward to the correct state.
    </div>
    <div class="text-h6 q-pa-sm" style="width:66%">
      In-game interactions will create data points which can be loaded through the proper URLs.
    </div>
    <div class="text-body1 q-pa-sm" style="width:66%">
      (That's the idea anyway)
    </div>
  </div>
    <!-- <div>
    </div> -->
  <!-- </div> -->
</template>

<style>
  /* h4 { margin: 20px 0; } */
</style>

<script>

// import { playerTeam, cpuTeam } from 'src/game/objects/units/unit.js'
// import { playerTeam, cpuTeam } from 'src/game/initialize.js'
// import fieldplayer from 'src/components/fieldplayer'
// import drawer from '../components/drawer.vue'
// import rightdrawer from '../components/rightdrawer.vue'
// import Selector from 'src/game/selectors/Selector.js'
//
// var selector = new Selector({
//   playerTeam: playerTeam,
//   cpuTeam: cpuTeam,
//   log: [],
//   logID: 0
// })
// selector.changeState('RoundStart')
// console.log('cpuTeam', cpuTeam)
// console.log('playerTeam', playerTeam)
//
// import { openURL } from 'quasar'

export default {
  data: function () {
    return {
      // playerTeam: playerTeam,
      // cpuTeam: cpuTeam,
      // // activeUnit: [],
      // leftDrawerOpen: true,
      // selector
      // // rightDrawerOpen: true // this.$q.platform.is.desktop
    }
  },
  props: [],
  // props: ['rightDrawerOpen', 'rightDrawerPage'],
  // methods: {
  //   canTarget: function (selector, unit) {
  //     return selector.canTarget(unit)
  //   },
  //   isActive: function (selector, unit) {
  //     return selector.stateData.activeUnit.id
  //       ? unit.id === selector.stateData.activeUnit.id
  //       : false
  //   },
  //   prevTarget: function (selector, unit) {
  //     return selector.isPrevTarg(unit)
  //   },
  //   battlefieldClick: function (selector, unit) {
  //     selector.getClickMode(unit).onClick(selector, unit)
  //   },
  //   openURL
  // },
  // computed: {
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
    // fieldplayer,
    // rightdrawer
  }
}
</script>

<style scoped>

</style>
