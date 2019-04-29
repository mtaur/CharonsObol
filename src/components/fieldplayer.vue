<template>
<div class="row col-3 justify-center align-center">
  <div class="wind justify-center align-center"
    :class="{active: isActive}">
    <div class="row">
      <div class="col-4 placebox justify-center align-center">
        <div class="placeholder">(Unit)</div>
      </div>
      <div class="align-center col-8 row">
        <!-- <div class = "col-6"
        v-for="stat in unit.baseStats" :key="stat.name"> -->
        <div class = "col-6"
        v-for="stat in baseStats" :key="stat.name" :unit="unit">
        <!-- <div v-for="stat in unit.baseStats" :unit="unit" :stat="stat"> -->
        <!-- <statrow v-for="stat in basicStats" :unit="unit" :stat="unit.baseStats[stat]" :key="stat"></statrow> -->
        <q-chip dense color="white">
          <q-avatar color="red" text-color="white">{{ unit.baseStats[stat].value }}</q-avatar>
          <!-- <q-avatar color="red" text-color="white">{{ stat.value }}</q-avatar> -->
          {{ unit.baseStats[stat].name }}
        </q-chip>
        <!-- {{stat.name}}: {{stat.value}} -->
        </div>
      </div>
    </div>
    <div class="row namebox justify-center align-center">
      <h6>{{ unit.name }}</h6>
    </div>
  </div>
  <!-- <div class="row statline align-center">
    <statrow v-for="stat in unit.baseStats" :unit="unit" :stat="stat" :key="stat.name"></statrow>
  </div> -->
</div>
</template>

<script>
// import statrow from './statchange.vue'

export default {
  props: ['unit', 'isActive'],
  // components: { statrow },
  data () {
    return {
      baseStats: ['INIT', 'MELEE', 'RANGED', 'MAGIC', 'DR']
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
    border-radius: 10px;
    margin: 5px;
    /* height: 22vh; */
    /* display: flex; */
    /* height: 320px */
  }
  /* .namebox {  } */
  /* .statline { height: 45px; } */

  .placebox {
    /* height: 110px; */
    /* margin: 5px 0 0 5px; */
  }
  .placeholder {
    background-color: #a77;
    width: 80px;
    height: 80px;
    margin: 5px 0 0 5px;
    text-align: center;
    justify-content: center;
    border-radius: 5px;
  }
  .active {
    background-color: #4cd;
  }
</style>
