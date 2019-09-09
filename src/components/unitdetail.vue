<template>
<div class="col-3 wind justify-center align-center">
  <div class="row placebox justify-center align-center">
    <div class="placeholder">(Unit)</div>
  </div>
  <div class="row namebox justify-center align-center">
    <h6>{{ unit.name }}</h6>
  </div>
  <div class="row items-center justify-center">
    <div class="q-pa-sm">
      <q-btn color="amber" glossy label="Show/hide stat points"
      @click="showStats = !showStats"></q-btn>
    </div>
  </div>
  <div
  v-show="showStats"
  class="row statline align-center">
    <statrow v-for="stat in unit.baseStats" :unit="unit" :stat="stat" :key="stat.name"></statrow>
    <!-- <statrow v-for="stat in basicStats" :unit="unit" :stat="unit.baseStats[stat]" :key="stat"></statrow> -->
  </div>
  <div class="row items-center justify-center">
    <div class="q-pa-sm">
      <q-btn color="teal" glossy label="Show/hide consumables"
      @click="showConsumables = !showConsumables"></q-btn>
    </div>
    <!-- <div class="col-8">
      <div v-for="item in unit.items" :key="item.name" class="row justify-center">
        <strong>{{ item.name }}</strong>
        <itemTooltip :item="item" :unit="unit"></itemTooltip>
      </div>
    </div>
    <div class="col-4">
      <q-btn color="teal" glossy label="Show/hide consumables"
      @click="showConsumables = !showConsumables"></q-btn>
    </div> -->
  </div>
  <consumables v-show="showConsumables" :unit="unit" :playerTeam="playerTeam" :cpuTeam="cpuTeam" :selector="selector"></consumables>
  <actions :unit="unit" :playerTeam="playerTeam" :cpuTeam="cpuTeam" :selector="selector"></actions>
</div>
</template>

<script>
import statrow from './statchange.vue'
// import itemTooltip from './itemTooltip.vue'
import actions from './actions.vue'
import consumables from './consumables.vue'

export default {
  props: ['unit', 'playerTeam', 'cpuTeam', 'selector'],
  components: { statrow, actions, consumables },
  // components: { statrow, itemTooltip, actions, consumables },
  data () {
    return {
      showConsumables: false,
      showStats: false
      // basicStats: ['INIT', 'MELEE', 'RANGED', 'MAGIC', 'DR']
    }
  }
}
</script>

<style scoped>
  h6 {
    margin: 0 5px 10px 5px;
    text-align: center;
  }
  .col-3 {
    /* height: auto; */
  }
  .wind {
    background-color: #ddd;
    /* height: 320px */
  }
  /* .namebox {  } */
  /* .statline { height: 45px; } */

  .placebox {
    /* height: 110px; */
    margin: 10px 0 0 0;
  }
  .placeholder {
    background-color: #a77;
    width: 80px;
    height: 80px;
    margin: 5px 0 0 5px;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
    border-radius: 5px;
  }

</style>
