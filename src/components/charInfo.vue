<template>
  <div>
    <h4 class="row justify-center">Unit info</h4>
    <!-- <div class="row justify-center">
      <div class="justify-center">
        <q-btn @click="toggleVerbose" color="blue">Verbose</q-btn>
      </div>
    </div> -->
    <!-- <div class="justify-center">
      <div class="q-pa-md flex flex-center">
        <q-pagination
        v-model="selector.currentLogPage"
        :max="pages"
        :maxPages="5"
        :direction-links="true"
        :boundary-numbers="true"
        :boundary-links="true"
        >
        </q-pagination>
      </div>
    </div> -->
    <div class="row text-h4 q-pa-sm justify-center items-center">
      <div class="text-amber-9">
        CPU
      </div>
    </div>
    <div class="row text-caption">
      <div class="col-3 bg-teal-4" v-for="unit in selector.game.cpuTeam.back" :key="unit.id">
        {{ unit.name }}
      </div>
    </div>
    <div class="row text-caption">
      <div class="col-3 bg-teal-4" v-for="unit in selector.game.cpuTeam.front" :key="unit.id">
        {{ unit.name }}
      </div>
    </div>
    <q-separator inset></q-separator>
    <div class="row text-h4 q-pa-sm justify-center items-center">
      <div class="text-amber-9">
        Player
      </div>
    </div>
    <div class="row text-caption">
      <div class="col-3 bg-teal-4" v-for="unit in selector.game.playerTeam.front" :key="unit.id">
        {{ unit.name }}
      </div>
    </div>
    <div class="row text-caption">
      <div class="col-3 bg-teal-4" v-for="unit in selector.game.playerTeam.back" :key="unit.id">
        {{ unit.name }}
      </div>
    </div>
    <q-separator inset></q-separator>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'

export default {
  name: 'battleLog',
  props: ['selector'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      verbose: false
      // current: 1
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    // current () {
    //   return this.selector.currentLogPage
    // },
    pages () {
      return this.selector.roundNum
      // return this.selector.log.length > 0 ? this.selector.log.length : 1
    },
    thisRound () {
      return this.selector.log.filter((item) => item.round === this.selector.currentLogPage)
    }
  },
  methods: {
    show (type) {
      if (this.verbose) return true
      if (type === 'dred' || type === 'dref') {
        return false
      }
      return true
    },
    primary (type) {
      if (type !== 'dred' && type !== 'dref') return true
      return false
    },
    actionStyle (type) {
      if (type === 'dred' || type === 'dref') {
        return {
          fontSize: '12px'
        }
      } else if (type === 'actionStart') {
        return {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      } else {
        return {
          fontSize: '16px'
        }
      }
    },
    toggleVerbose () {
      this.verbose = !this.verbose
    }
    // openURL
  },
  components: {
    // unitdetail
  }
}
</script>

<style>
</style>
