<template>
  <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal-2" max-width="20vw">
    <!-- <q-card dark bordered class="bg-grey-9 my-card"> -->
    <q-card class="bg-blue-grey-7">
      <q-card-section>
        <div class="text-h6">{{ soul.name }}</div>
        <!-- <div class="text-subtitle2" v-if="item.cost > 0" :style="{ color: 'blue' }">
          {{ item.cost }} SP
        </div> -->
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div>{{ soul.desc }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section v-if="showChanges">
        <div class="text-subtitle2">
          Total stat changes:
        </div>
        <div v-for="stat in statChanges" :key="stat.name" :class="{ red: stat.value < 0 }">
          {{ stat.name }}: <span v-if="stat.value > 0">+</span>{{ stat.value }}
        </div>
      </q-card-section>
    </q-card>

  </q-tooltip>
</template>

<script>
import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

export default {
  props: ['soul', 'unit', 'selector'],
  data () {
    return {
      // newStats: 'false'
    }
  },
  computed: {
    activeUnit: function () {
      if (this.showChanges) {
        return this.selector.stateData.activeUnit
      } else { return null }
    },
    showChanges: function () {
      return hasProp(this.selector, 'stateData.activeUnit.name')
    },
    newStats: function () {
      if (!this.activeUnit) { return [] }
      let copy = clone(this.activeUnit)
      console.log('copy', copy)
      copy.souls.push(clone(this.soul))
      // copy.raise(this.stat.name)
      // copy.baseStats[this.stat.name].counters++
      // console.log('Nothing happened?')
      // return copy.effectiveStatValues
      return copy.effectiveStatValues
      // this.newStats = copy.effectiveStatValues
    },
    statChanges: function () {
      let changes = []
      if (!this.activeUnit) { return [] }
      for (let key in this.newStats) {
        if (this.newStats[key] !== this.activeUnit.effectiveStatValues[key]) {
          // changes[key] = this.newStats[key] - this.unit.effectiveStatValues[key]
          let stat = {
            name: key,
            value: this.newStats[key] - this.activeUnit.effectiveStatValues[key]
          }
          changes.push(stat)
        }
      }
      return changes
    } // ,
    // bgColor: function () {
    //   let canAfford = this.unit.availSP >= this.unit.baseStats[this.stat.name].cost
    //   if (canAfford) {
    //     return 'bg-purple'
    //   } else return 'bg-grey'
    // }
    // newStats: function () {
    //   let copy = clone(this.unit)
    //   copy.raise(this.stat.name)
    //   console.log('Nothing happened?')
    //   // return copy.effectiveStatValues
    //   return copy.effectiveStatValues
    //   // this.newStats = copy.effectiveStatValues
    // },
    // statChanges: function () {
    //   let changes = []
    //   for (let key in this.newStats) {
    //     if (this.newStats[key] !== this.unit.effectiveStatValues[key]) {
    //       // changes[key] = this.newStats[key] - this.unit.effectiveStatValues[key]
    //       let stat = {
    //         name: key,
    //         value: this.newStats[key] - this.unit.effectiveStatValues[key]
    //       }
    //       changes.push(stat)
    //     }
    //   }
    //   return changes
    // }
  },
  methods: {
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
  button {
    background-color: #ec5;
  }

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
/*
  .red {
    color: red
  }
 */
  div {
    font-size: 16px;
  }

</style>
