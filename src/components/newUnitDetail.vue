<template>
<div class="col-3 wind justify-center align-center">
  <div class="row placebox justify-center items-center align-center">
    <q-avatar square
    class="placeholder">
      <q-img v-if="unit.souls.length > 0" :src="getImg(unit.souls[0])"/>
      <q-img v-else :src="'statics/gameIcons/souls/CAENEN.png'"/>
    </q-avatar>
    <!-- <div class="placeholder">(Unit)</div> -->
  </div>
  <div class="row namebox justify-center align-center">
    <h6>{{ unit.name }}</h6>
  </div>
  <div class="q-pa-md q-gutter-y-md column items-center">
    <q-btn-group outline>
      <q-btn
      :color="buttonColor('showStats')"
      :textColor="selector.showStats ? 'white' : 'black'"
      label="Stats"
      @click="selector.showStats = !selector.showStats">
      </q-btn>
      <q-btn
      :color="buttonColor('showConsumables')"
      :textColor="selector.showConsumables ? 'white' : 'black'"
      label="Items"
      @click="selector.showConsumables = !selector.showConsumables">
      </q-btn>
      <q-btn
      :color="buttonColor('showAbilities')"
      :textColor="selector.showAbilities ? 'white' : 'black'"
      label="Skills"
      @click="selector.showAbilities = !selector.showAbilities">
      </q-btn>
    </q-btn-group>
  </div>
  <!-- STATS!!! -->
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
  <!-- CONSUMABLES!!! -->
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
  <!-- ABILITIES!!! -->
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
      <newUnitActions :unit="unit" :playerTeam="playerTeam" :cpuTeam="cpuTeam" :selector="selector"></newUnitActions>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
import statrow from './statchange.vue'
// import itemTooltip from './itemTooltip.vue'
import newUnitActions from './newUnitActions.vue'
import consumables from './consumables.vue'

export default {
  props: ['unit', 'playerTeam', 'cpuTeam', 'selector'],
  components: { statrow, newUnitActions, consumables },
  // components: { statrow, itemTooltip, actions, consumables },
  data () {
    return {
      // showConsumables: false,
      // showStats: false,
      // showAbilities: true
      // basicStats: ['INIT', 'MELEE', 'RANGED', 'MAGIC', 'DR']
    }
  },
  methods: {
    buttonColor (btnName) {
      let btnVal = this.selector[btnName]
      if (btnVal) {
        if (btnName === 'showStats') { return 'amber' }
        if (btnName === 'showConsumables') { return 'orange-10' }
        if (btnName === 'showAbilities') { return 'light-green' }
      } else {
        if (btnName === 'showStats') { return 'amber-2' }
        if (btnName === 'showConsumables') { return 'orange-2' }
        if (btnName === 'showAbilities') { return 'light-green-2' }
      }
    },
    getImg (soul) {
      // statics/icons/action-star.png
      return 'statics/gameIcons/souls/' + soul.NAME + '.png'
      // return 'statics/icons/souls/' + soul.NAME + '.png'
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
