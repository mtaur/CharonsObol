<template>
  <q-drawer
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="250"
    :breakpoint="0"
  >
    <div class="sp">
      <div>
        <h4 key='SP'>SP: {{ playerTeam.SP }}</h4>
      </div>
    </div>

    <div class="justify-center">
      <q-btn size='md' color="red" @click="enemyTurn">Enemy Turn</q-btn>
      <q-btn size='md' color="green" @click="newRound">New Round</q-btn>
    </div>

    <unitdetail v-for="unit in activeUnit"
      :unit="unit"
      :cpuTeam = "cpuTeam"
      :playerTeam = "playerTeam"
      :selector = "selector"
      :key="unit.name">
    </unitdetail>
  </q-drawer>
</template>

<script>
import { openURL } from 'quasar'
import unitdetail from 'src/components/unitdetail'

export default {
  name: 'leftDrawer',
  props: ['visible', 'activeUnit', 'playerTeam', 'cpuTeam', 'selector'],
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    newRound () {
      this.playerTeam.field.forEach(
        (unit) => {
          if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
          if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
          unit.hasAction.major = true
          unit.hasAction.minor = true
        })
      this.cpuTeam.field.forEach(
        (unit) => {
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
    }
  },
  components: { unitdetail }
}
</script>

<style>
  .sp {
    /* justify-content: center; */
    text-align: center;
  }
</style>
