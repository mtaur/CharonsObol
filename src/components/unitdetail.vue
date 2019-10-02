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
      <q-btn color="amber" glossy label="Toggle stat points"
      @click="selector.showStats = !selector.showStats"></q-btn>
    </div>
  </div>
  <div class="row items-center justify-center">
    <div class="q-pa-sm">
      <q-btn color="orange-10" glossy label="Toggle consumables"
      @click="selector.showConsumables = !selector.showConsumables"></q-btn>
    </div>
  </div>
  <div class="row items-center justify-center">
    <div class="q-pa-sm">
      <q-btn color="light-green-8" glossy label="Toggle abilities"
      @click="selector.showAbilities = !selector.showAbilities"></q-btn>
    </div>
  </div>
  <q-card
    v-show="selector.showStats"
    class="my-card text-white"
    style="background: radial-gradient(circle, #ffd336 0%, #886b01 100%)"
  >
    <q-card-section class="text-h6">
      <q-btn
      @click="selector.showStats=false"
      round unelevated
      size="12px" icon="clear" class="absolute-left"/>
      <span class="absolute-center">Spend SP</span>
    </q-card-section>
    <q-card-section>
      <div class="row text-h4 justify-center text-purple">{{ playerTeam.SP }} SP</div>
      <div class="row statline align-center">
        <statrow v-for="stat in unit.baseStats" :unit="unit" :stat="stat" :key="stat.name"></statrow>
      </div>
    </q-card-section>
  </q-card>
  <q-card
    v-show="selector.showConsumables"
    class="my-card text-white"
    style="background: radial-gradient(circle, #ff9036 0%, #882501 100%)"
  >
    <q-card-section class="text-h6">
      <q-btn
      @click="selector.showConsumables=false"
      round unelevated
      size="12px" icon="clear" class="absolute-left"/>
      <span class="absolute-center">Consumables</span>
    </q-card-section>
    <q-card-section>
      <consumables :unit="unit" :playerTeam="playerTeam" :cpuTeam="cpuTeam" :selector="selector"></consumables>
    </q-card-section>
  </q-card>
  <q-card
    v-show="selector.showAbilities"
    class="my-card text-white"
    style="background: radial-gradient(circle, #36ffaa 0%, #01884f 100%)"
  >
    <q-card-section class="text-h6">
      <q-btn
      @click="selector.showAbilities=false"
      round unelevated
      size="12px" icon="clear" class="absolute-left"/>
      <span class="absolute-center">Abilities</span>
    </q-card-section>
    <q-card-section>
      <actions :unit="unit" :playerTeam="playerTeam" :cpuTeam="cpuTeam" :selector="selector"></actions>
    </q-card-section>
  </q-card>
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
      // showConsumables: false,
      // showStats: false,
      // showAbilities: true
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
