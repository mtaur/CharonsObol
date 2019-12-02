<template>
  <div>
    <h4 class="row justify-center">Unit info</h4>
    <div v-if="selector.game.cpuTeam.field.length > 0" class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <q-card class="q-gutter-md bg-blue-grey-8">
          <q-card-section>
            <div class="row text-h4 q-pa-sm justify-center items-center">
              <div class="text-amber-9">
                CPU
              </div>
            </div>
            <div class="row text-caption">
              <div class="col-3" v-for="unit in selector.game.cpuTeam.back" :key="unit.id">
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div>
            </div>
            <div class="row text-caption">
              <div class="col-3" v-for="unit in selector.game.cpuTeam.front" :key="unit.id">
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-2"></div>
    </div>
    <div v-if="selector.game.playerTeam.field.length > 0"  class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <!-- <q-separator inset></q-separator> -->
        <q-card class="q-gutter-md bg-teal-9">
          <q-card-section>
            <div class="row text-h4 q-pa-sm justify-center items-center">
              <div class="text-amber-9">
                Player
              </div>
            </div>
            <div class="row text-caption">
              <div class="col-3" v-for="unit in selector.game.playerTeam.front" :key="unit.id">
                <newSmallUnit :unit="unit" :selector="selector"></newSmallUnit>
                <!-- <smallUnit :unit="unit" :selector="selector"></smallUnit> -->
              </div>
            </div>
            <div class="row text-caption">
              <div class="col-3" v-for="unit in selector.game.playerTeam.back" :key="unit.id">
                <newSmallUnit :unit="unit" :selector="selector"></newSmallUnit>
                <!-- <smallUnit :unit="unit" :selector="selector"></smallUnit> -->
              </div>
            </div>
            <!-- <q-separator inset></q-separator> -->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-2"></div>
    </div>
    <newUnitInfo v-if="selector.stateData.activeUnit.name"
    :selector="selector"
    :unit="selector.stateData.activeUnit"></newUnitInfo>
    <!-- <newUnitInfo v-if="selector.stateData.inspectUnit.name"
    :selector="selector"
    :unit="selector.stateData.inspectUnit"></newUnitInfo> -->
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
// import smallUnit from './smallUnit'
import newSmallUnit from './newSmallUnit'
import newUnitInfo from './newUnitInfo'

export default {
  name: 'charInfo',
  props: ['selector'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    // smallUnit,
    newSmallUnit,
    newUnitInfo
    // unitdetail
  }
}
</script>

<style>
</style>
