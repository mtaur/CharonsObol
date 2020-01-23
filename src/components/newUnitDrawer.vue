<template>
  <q-drawer
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="300"
    :breakpoint="0"
  >
    <q-scroll-area class="fit">
      <SPPanel :playerTeam="playerTeam">
      </SPPanel>
      <span v-if="selector.turnState !== 'player'" @click.stop=''>
      <newUnitDetail v-for="unit in activeUnit"
        :unit="unit"
        :cpuTeam = "cpuTeam"
        :playerTeam = "playerTeam"
        :selector = "selector"
        :key="unit.name">
      </newUnitDetail>
      </span>
      <span v-else>
      <newUnitDetail v-for="unit in activeUnit"
        :unit="unit"
        :cpuTeam = "cpuTeam"
        :playerTeam = "playerTeam"
        :selector = "selector"
        :key="unit.name">
      </newUnitDetail>
      </span>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { openURL } from 'quasar'
import newUnitDetail from 'src/components/newUnitDetail'
import SPPanel from 'src/components/SPPanel'

export default {
  name: 'leftDrawer',
  props: ['visible', 'activeUnit', 'playerTeam', 'cpuTeam', 'selector'],
  data () {
    return {
      turnPoints: true
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    newRound () {
      this.playerTeam.field.forEach(
        (unit) => {
          // if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
          // if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
          unit.hasAction.major = true
          unit.hasAction.minor = true
        })
      this.cpuTeam.field.forEach(
        (unit) => {
          if (unit.hasAction.major) { this.playerTeam.SP -= 5 }
          if (unit.hasAction.minor) { this.playerTeam.SP -= 3 }
          if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
          if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
          unit.hasAction.major = true
          unit.hasAction.minor = true
        })
      this.selector.changeState('ChooseUnit')
    },

    enemyTurn () {
      let remainingTurn = false
      for (let index in this.cpuTeam.field) {
        let unit = this.cpuTeam.field[index]
        if (unit.hasAction.major || unit.hasAction.minor) {
          remainingTurn = true
        }
      }
      if (remainingTurn) {
        this.playerTeam.SP += 1
        this.selector.changeState('EnemyTurn')
      }
    },
    getImg (soul) {
      // statics/icons/action-star.png
      return 'statics/gameIcons/souls/' + soul.NAME + '.png'
      // return 'statics/icons/souls/' + soul.NAME + '.png'
    }
  },
  components: { newUnitDetail, SPPanel }
}
</script>

<style>
  .sp {
    /* justify-content: center; */
    text-align: center;
  }
</style>
