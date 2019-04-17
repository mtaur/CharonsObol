<template>
<div class="col-3 wind justify-center align-center">
  <div class="row placebox justify-center align-center"><div class="placeholder">(Unit)</div></div>
  <div class="row namebox justify-center align-center">
    <h6>{{ unit.name }}</h6>
  </div>
  <div class="row statline align-center">
    <statrow v-for="stat in unit.baseStats" :unit="unit" :stat="stat" :key="stat.name"></statrow>
  </div>
</div>
</template>

<script>
import statrow from './statchange.vue'

export default {
  props: ['unit'],
  components: { statrow },
  data () {
    return { }
  },
  methods: {
  }
}
</script>

<style scoped>
  h6 {
    margin: 0 5px 10px 5px;
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
    width: 100px;
    height: 100px;
    text-align: center;
    justify-content: center;
  }

</style>
