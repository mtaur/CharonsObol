<template>
  <div class="col-6">
    <!-- {{ stat.name }}: {{ stat.value }}  <button @click="increase">+  <q-badge color="red" floating>{{ stat.cost }}</q-badge></button> -->
    <div class="row align-end">
      <!-- <div class="col-9 statname">{{ stat.name }}: {{ stat.value }}</div> -->
      <div class="col-9 statname">{{ stat.name }}: {{ val(stat) }}</div>
      <div class="col-3">
        <q-btn round glossy :color="btnColor" text-color="black" size="10px" @click="increase" >
          <span class="btxt">+</span>
          <statTooltip :stat="stat" :unit="unit"></statTooltip>
          <q-badge color="purple" floating>{{ stat.cost }}</q-badge>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import statTooltip from './statTooltip'

export default {
  props: ['stat', 'unit'],
  data () {
    return { }
  },
  computed: {
    btnColor () {
      // function raise (unit) {
      //   unit.baseStats[statName].increase()
      // }
      // let stat = this.baseStats[statName]
      //
      // if (this.playerTeam.SP >= stat.cost) {
      //   this.playerTeam.SP -= stat.cost
      //   this.applyChange(raise)
      // }
      // if (this.unit.playerTeam.SP >= this.stat.cost) {
      if (this.unit.availSP >= this.stat.cost) {
        return 'amber'
      }
      return 'grey-5'
    }
  },
  components: { statTooltip },
  methods: {
    increase: function () { this.unit.raise(this.stat.name) },
    val (stat) {
      return this.unit.effectiveStatValues[stat.name]
    }
  }
}
</script>

<!-- /* <style>
/* @import url('https://fonts.googleapis.com/css?family=Neuton'); */
/* * { font-family: 'Neuton:400,700', serif; } */
</style> */ -->

<style scoped>
  .col-6 {
    padding: 5px 10px;
    /* padding: 0 10px 0 10px; */
  }

  /* span {
    background-color: #cc0;
  } */
  /* button {
    background-color: #ec5;
  } */

  q-btn {
    /* color: #cc7; */
    /* font-size: 32px; */
  }
  .statname {
    font-weight: bold;
    text-align: right;
    padding-right: 5px;
  }

  .btxt {
    font-size: 28px;
  }

  div {
    font-size: 16px;
  }

</style>
