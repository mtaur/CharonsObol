<template>
  <div class="sp" key="SP">
    <div>
      <div class="text-h5">
        Spirit Points (SP)
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
          <div style="font-size: 14px">
            SP stands for "spirit points." Units, items, consumables, stat upgrades, and souls cost SP. SP spent on stat
            upgrades or souls for the same unit has an escaleting cost, so choose carefully for synergy.
            SP is uninvested when consumables are used or an ally dies.  Otherwise, there are no refunds.
          </div>
        </q-tooltip>
      </div>
      <div class="col-12 row items-center">
        <div class="col-3">Available: {{ playerTeam.SP }}</div>
        <div class="col-6">
          <q-linear-progress
          class="q-mt-sm"
          rounded style="height: 10px"
          :value="playerTeam.SP / playerTeam.SPTotal" color="indigo-5"
          />
        </div>
        <div class="col-3">Total: {{ playerTeam.SPTotal }}</div>
      </div>
      <!-- <div style="font-size: 20px">{{ playerTeam.SP }} Available</div> -->
      <!-- <div style="font-size: 14px">{{ playerTeam.SPTotal - playerTeam.SP }} Invested, {{ playerTeam.SPTotal }} total.</div> -->
      <div style="font-size: 14px">Current maximum possible SP total is {{ playerTeam.SPCap }}.</div>
    </div>
    <div class="text-h5">
      Essence summary:
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
        <div style="font-size: 14px">
          Essence is a sort of "experience point" which is invested in the form of SP, with diminishing returns, starting from {{ playerTeam.SPEff * 100 }}%
          efficiency and decreasing with higher Essence totals.
        </div>
        <div style="font-size: 14px">
          Some classes will be able to use essence directly for some of their skills and passives.
        </div>
      </q-tooltip>
    </div>
    <div class="col-12 row items-center">
      <div class="col-3">Available: {{ playerTeam.RSPAvail }}</div>
      <div class="col-6">
        <q-linear-progress
        class="q-mt-sm"
        rounded style="height: 10px"
        :value="playerTeam.RSPAvail / playerTeam.RSP" color="grey"
        />
      </div>
      <div class="col-3">Total: {{ playerTeam.RSP }}</div>
    </div>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import newUnitDetail from 'src/components/newUnitDetail'

export default {
  name: 'SPPanel',
  props: ['playerTeam'],
  data () {
    return {
      // turnPoints: true
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    // openURL,
    // newRound () {
    //   this.playerTeam.field.forEach(
    //     (unit) => {
    //       // if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
    //       // if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
    //       unit.hasAction.major = true
    //       unit.hasAction.minor = true
    //     })
    //   this.cpuTeam.field.forEach(
    //     (unit) => {
    //       if (unit.hasAction.major) { this.playerTeam.SP -= 5 }
    //       if (unit.hasAction.minor) { this.playerTeam.SP -= 3 }
    //       if (!unit.hasAction.major) { this.playerTeam.SP += 2 }
    //       if (!unit.hasAction.minor) { this.playerTeam.SP += 1 }
    //       unit.hasAction.major = true
    //       unit.hasAction.minor = true
    //     })
    //   this.selector.changeState('ChooseUnit')
    // },
    //
    // enemyTurn () {
    //   let remainingTurn = false
    //   for (let index in this.cpuTeam.field) {
    //     let unit = this.cpuTeam.field[index]
    //     if (unit.hasAction.major || unit.hasAction.minor) {
    //       remainingTurn = true
    //     }
    //   }
    //   if (remainingTurn) {
    //     this.playerTeam.SP += 1
    //     this.selector.changeState('EnemyTurn')
    //   }
    // },
    // getImg (soul) {
    //   // statics/icons/action-star.png
    //   return 'statics/gameIcons/souls/' + soul.NAME + '.png'
    //   // return 'statics/icons/souls/' + soul.NAME + '.png'
    // }
  },
  components: {}
}
</script>

<style>
  .sp {
    /* justify-content: center; */
    text-align: center;
  }
</style>
