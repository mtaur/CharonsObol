<template>
  <q-drawer
    side="right"
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="page === 'charInfo' || page === 'newCharInfo' || page === 'items' || page === 'souls'
      ? 500 : 350"
    :breakpoint="0"
  >
    <q-scroll-area class="fit">
      <battleLog v-if="page==='log'" :selector="selector"></battleLog>
      <charInfo v-if="page==='charInfo'" :selector="selector"></charInfo>
      <newCharInfo v-if="page==='newCharInfo'" :selector="selector"></newCharInfo>
      <newCharSouls v-if="page==='souls'" :selector="selector"></newCharSouls>
      <newCharItems v-if="page==='items'" :selector="selector"></newCharItems>
      <newCharConsumables v-if="page==='consumables'" :selector="selector"></newCharConsumables>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
import battleLog from './battleLog'
import charInfo from './charInfo'
import newCharInfo from './newCharInfo'
import newCharSouls from './newCharSouls'
import newCharItems from './newCharItems'
import newCharConsumables from './newCharConsumables'

export default {
  name: 'rightDrawer',
  props: ['visible', 'selector', 'page'], // , 'activeUnit', 'playerTeam'],
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
    battleLog,
    charInfo,
    newCharInfo,
    newCharItems,
    newCharConsumables,
    newCharSouls
    // unitdetail
  }
}
</script>

<style>
</style>
