<template>
<div class="col-3 wind justify-center">
  <div class="row justify-center">
    <h4>{{ unit.name }}</h4>
  </div>
  <div class="row">
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

<style>
  .wind { background-color: #ddd }
</style>
