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
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
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
      <div class="col-1"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
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
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div>
            </div>
            <div class="row text-caption">
              <div class="col-3" v-for="unit in selector.game.playerTeam.back" :key="unit.id">
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div>
            </div>
            <!-- <q-separator inset></q-separator> -->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-1"></div>
    </div>
    <unitInfo v-if="selector.stateData.inspectUnit.name"
    :selector="selector"
    :unit="selector.stateData.inspectUnit"></unitInfo>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
import smallUnit from './smallUnit'
import unitInfo from './unitInfo'

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
    smallUnit,
    unitInfo
    // unitdetail
  }
}
</script>

<style>
</style>
