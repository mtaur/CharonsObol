<template>
<div class="row col-3 justify-center align-center">
  <div class="wind justify-center align-center"
    :class="{active: isActive}">
    <div class="row">
      <div class="col-4 placebox justify-center align-center">
        <div class="placeholder">(Unit)</div>
      </div>
      <div class="align-center col-8 row">
        <div class = "col-6"
          v-for="stat in baseStats" :key="stat.name" :unit="unit">
          <q-chip dense color="white">
            <q-avatar color="red" text-color="white">{{ unit.effectiveStatValues[stat] }}</q-avatar>
            {{ stat }}
          </q-chip>
        </div>
      </div>
    </div>
    <div class="row">
      <resbar :resource="unit.baseStats.MP"></resbar>
    </div>
    <div class="row">
      <resbar :resource="unit.baseStats.HP"></resbar>
    </div>
    <div class="row namebox justify-center align-center">
      <!-- <q-chip color="deep-orange"> -->
      <q-chip color="teal" text-color="white">
        <q-avatar>
          <!-- <img src="statics/icons/action-both.png"> -->
          <img :src="actStatus">
        </q-avatar>
        <h6>{{ unit.name }}</h6>
      </q-chip>
      <!-- <h6>{{ unit.name }}</h6> -->
    </div>
  </div>
  <!-- <div class="row statline align-center">
    <statrow v-for="stat in unit.baseStats" :unit="unit" :stat="stat" :key="stat.name"></statrow>
  </div> -->
</div>
</template>

<script>
// import statrow from './statchange.vue'
import resbar from './resbar.vue'

export default {
  props: ['unit', 'isActive'],
  // components: { statrow },
  data () {
    return {
      baseStats: ['INIT', 'MELEE', 'RANGED', 'MAGIC', 'DRED', 'DREF']
    }
  },
  computed: {
    actStatus () {
      if (this.unit.hasAction.major) {
        if (this.unit.hasAction.minor) {
          return 'statics/icons/action-both.png'
        } else { return 'statics/icons/action-star.png' }
      } else {
        if (this.unit.hasAction.minor) {
          return 'statics/icons/action-dot.png'
        } else { return 'statics/icons/action-none.png' }
      }
      // if (this.unit.name === 'Lynneth Javelle') { return 'statics/icons/action-dot.png' }
      // return 'statics/icons/action-both.png'
    }
  },
  components: {
    resbar
  },
  methods: {
  }
}
</script>

<style scoped>
  h6 {
    margin: 5px 0px 5px 0px;
    /* margin: 0 5px 10px 5px; */
    text-align: center;
    font-size: 16px;
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
