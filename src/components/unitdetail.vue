<template>
<div class="col-3 wind justify-center align-center">
  <div class="row placebox justify-center align-center"><div class="placeholder">(Unit)</div></div>
  <div class="row namebox justify-center align-center">
    <h6>{{ unit.name }}</h6>
  </div>
  <div class="row statline align-center">
    <statrow v-for="stat in unit.baseStats" :unit="unit" :stat="stat" :key="stat.name"></statrow>
    <!-- <statrow v-for="stat in basicStats" :unit="unit" :stat="unit.baseStats[stat]" :key="stat"></statrow> -->
  </div>
  <div v-for="item in unit.items" :key="item.name" class="row justify-center">
    <strong>{{ item.name }}</strong>
    <itemTooltip :item="item" :unit="unit"></itemTooltip>
    <!-- {{ item.desc }} -->
  </div>
</div>
</template>

<script>
import statrow from './statchange.vue'
import itemTooltip from './itemTooltip.vue'

export default {
  props: ['unit'],
  components: { statrow, itemTooltip },
  data () {
    return {
      // basicStats: ['INIT', 'MELEE', 'RANGED', 'MAGIC', 'DR']
    }
  },
  methods: {
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
