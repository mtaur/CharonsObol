<template>
  <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
      <strong>Effects of raising this stat:</strong>
      <!-- {{ newStats }} -->
      <div v-for="stat in statChanges" :key="stat.name" :class="{ red: stat.value < 0 }">
        {{ stat.name }}: <span v-if="stat.value > 0">+</span>{{ stat.value }}
      </div>
  </q-tooltip>
</template>

<script>
import { cloneDeep as clone } from 'lodash'

export default {
  props: ['stat', 'unit'],
  data () {
    return {
      // newStats: 'false'
    }
  },
  computed: {
    newStats: function () {
      let copy = clone(this.unit)
      copy.raise(this.stat.name)
      // console.log('Nothing happened?')
      // return copy.effectiveStatValues
      return copy.effectiveStatValues
      // this.newStats = copy.effectiveStatValues
    },
    statChanges: function () {
      let changes = []
      for (let key in this.newStats) {
        if (this.newStats[key] !== this.unit.effectiveStatValues[key]) {
          // changes[key] = this.newStats[key] - this.unit.effectiveStatValues[key]
          let stat = {
            name: key,
            value: this.newStats[key] - this.unit.effectiveStatValues[key]
          }
          changes.push(stat)
        }
      }
      return changes
    }
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

  .red {
    color: red
  }

  div {
    font-size: 16px;
  }

</style>
