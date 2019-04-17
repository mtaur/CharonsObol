<template>
  <div class="col-6">
    <!-- {{ stat.name }}: {{ stat.value }}  <button @click="increase">+  <q-badge color="red" floating>{{ stat.cost }}</q-badge></button> -->
    <div class="row align-end">
      <div class="col-9 statname">{{ stat.name }}: {{ stat.value }}</div>
      <div class="col-3">
        <q-btn round size="10px" @click="increase" >
          <span class="btxt">+</span>
          <q-badge color="purple" floating>{{ stat.cost }}</q-badge>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stat', 'unit'],
  data () {
    return { }
  },
  methods: {
    increase: function () { this.unit.raise(this.stat.name) }
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

  div {
    font-size: 16px;
  }

</style>
