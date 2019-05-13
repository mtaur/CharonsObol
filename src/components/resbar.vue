<template>
  <div class="col-12 row">
    <div class="col-2">{{ resource.name }}</div>
    <div class="col-7">
      <q-linear-progress
      class="q-mt-sm"
      rounded style="height: 15px"
      :value="progress" :color="getColor"
      />
    </div>
    <div class="col-3">{{ resource.current }}/{{ resource.max }}</div>
  </div>
  <!-- <div class="col-6">
    <div class="row align-end">
      <div class="col-9 statname">{{ stat.name }}: {{ stat.value }}</div>
      <div class="col-3">
        <q-btn round size="10px" @click="increase" >
          <span class="btxt">+</span>
          <q-badge color="purple" floating>{{ stat.cost }}</q-badge>
        </q-btn>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: ['resource'],
  data () {
    return { }
  },
  methods: {
  },
  computed: {
    progress () {
      return this.resource.max > 0 ? Math.min(this.resource.current / this.resource.max, 1) : 0
    },
    getColor () {
      return this.resource.name === 'HP' ? 'negative' : 'primary'
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
