<template>
  <q-page class="flex flex-center">
    <div class="col">
      <!-- <div class="row">
        <div class="col">
          <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
        </div>
      </div> -->
      <div class="row justify-center">
        <div class="justify-center">
          <h3 class="col-4 justify-center" :key='SP'>SP: {{ playerTeam.SP }}</h3>
        </div>
      </div>
      <div class="row justify-center">
        <unitdetail v-for="unit in playerTeam.front" :unit="unit" :key="unit.name"></unitdetail>
      </div>
      <div class="row justify-center">
        <unitdetail v-for="unit in playerTeam.back" :unit="unit" :key="unit.name"></unitdetail>
      </div>
    </div>
  </q-page>

</template>

<style>
</style>

<script>
// console.log('test123')
// import Doge from 'src/loadtest/folder/file1'
// import Doge from '../loadtest/folder/file1'
// var doge = new Doge()
// doge.bark()
// import 'src/loadtest/jsload'
// import * as test from 'src/game/selectors/select'
// import 'src/game/utility/promises'
// console.log(test.player.front)
import { playerTeam } from 'src/game/objects/units/unit.js'
import unitdetail from 'src/components/unitdetail'

export default {
  data: function () {
    return {
      playerTeam: playerTeam
    }
  },
  computed: {
    SP: function () {
      return playerTeam.SP
    }
  },
  name: 'PageIndex',
  components: { unitdetail }
}
</script>
