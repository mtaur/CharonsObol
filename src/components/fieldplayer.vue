<template>
<div class="row col-3 justify-center align-center q-pa-xs"
  :class="marginColorClass">
  <!-- :class="{active: isActive, canTarget: canTarget, prevTarget: prevTarget}"> -->
  <div class="wind justify-center align-center q-gutter-xs"
    :class="[bgColorClass, windClass, selectableClass]">
    <!-- :class="{active: isActive, canTarget: canTarget, prevTarget: prevTarget}"> -->
    <div class="row">
      <div class="col-4 placebox justify-center align-center">
        <div class="placeholder"
        :style="guardStyle">(Unit)</div>
      </div>
      <div class="align-center col-8 row">
        <div class = "col-6"
          v-for="stat in baseStats" :key="stat.name" :unit="unit">
          <q-chip square dense color="white">
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
    <div v-if="hasHealthOverTime" class="col-12 row">
      <div class="col-2">{{ Math.floor(healthOverTime.amount * healthOverTime.virulence * 3) }} / round</div>
      <div class="col-7">
        <q-linear-progress
        class="q-mt-sm"
        rounded style="height: 10px"
        :value="(Math.abs(healthOverTime.amount)) / unit.effectiveStatValues.HP"
        color="green"
        />
      </div>
      <div class="col-3">{{ healthOverTime.amount }} total</div>
    </div>
    <div class="row namebox justify-center align-center">
      <!-- <q-chip color="deep-orange"> -->
      <q-chip square color="teal" text-color="white">
        <q-avatar @click.stop="rest">
          <!-- <img src="statics/icons/action-both.png"> -->
          <img :src="actStatusImg">
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
import { hasIn as hasProp, cloneDeep as clone } from 'lodash'

export default {
  props: ['unit', 'isActive', 'canTarget', 'prevTarget', 'selector'],
  // props: ['unit', 'status'],
  // components: { statrow },
  data () {
    return {
      baseStats: ['INIT', 'MELEE', 'RANGED', 'MAGIC', 'DRED', 'DREF']
    }
  },
  computed: {
    actStatusImg () {
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
    },
    status () {
      if (this.canTarget) {
        return 'canTarget'
      }
      if (this.prevTarget) {
        return 'prevTarget'
      }
      if (this.isActive) {
        return 'isActive'
      }
      return 'idle'
    },
    bgColorClass () {
      let bgColor = 'grey-4'
      let palette = {
        idle: 'grey-5',
        isActive: 'cyan',
        canTarget: 'teal',
        prevTarget: 'indigo'
      }
      if (hasProp(palette, this.status)) {
        bgColor = palette[this.status]
      }
      // console.log([this.unit.side === 'player', this.selector.turnState === 'player', this.unit.hasTurn, bgColor === 'grey-4'])
      if (this.unit.side === 'player' && this.selector.turnState === 'player' && (this.unit.hasAction.major || this.unit.hasAction.minor) && bgColor === 'grey-5') {
        bgColor = 'amber-3'
      }
      return 'bg-' + bgColor
      // if (this.isActive) { bgColor = 'cyan' }
    },
    marginColorClass () {
      if (this.status === 'idle') {
        return 'grey-4'
      }
      return this.bgColorClass
    },
    windClass () {
      if (this.status === 'idle') {
        return 'wind'
      }
      return 'highlightWind'
    },
    guardStyle () {
      let isGuarding = false
      for (let index in this.unit.statuses) {
        if (this.unit.statuses[index].name === 'guard') { isGuarding = true }
      }
      if (isGuarding) {
        return {
          borderWidth: '8px',
          borderColor: 'black',
          borderStyle: 'solid',
          borderRadius: '0px'
        }
      }
      return {}
    },
    hasHealthOverTime () {
      for (let index in this.unit.statuses) {
        if (this.unit.statuses[index].NAME === 'HEALTHOVERTIME') { return true }
      }
      return false
    },
    healthOverTime () {
      let effect = {}
      for (let index in this.unit.statuses) {
        if (this.unit.statuses[index].NAME === 'HEALTHOVERTIME') {
          effect = this.unit.statuses[index].effects[0]
        }
      }
      return effect
    } // ,
    // selectableClass () {
    //   if (this.unit.side === 'player' && this.selector.turnState === 'player') {
    //     // return 'glossy'
    //     return 'amber-2'
    //   }
    //   return ''
    // }
  },
  components: {
    resbar
  },
  methods: {
    rest () {
      if (this.unit.hasAction.minor && this.unit.side === 'player') {
        this.selector.stateData.activeUnit = this.unit
        this.selector.stateData.activeSkill = clone(this.unit.actions.filter((action) => action.NAME === 'RESTMINOR')[0])
        // this.selector.stateData.activeSkill.prevTargs.push(this.unit)
        // this.selector.stateData.activeSkill.targetRules.shift()
        this.selector.onClicks.execute(this.selector, this.unit)
      } else if (this.unit.hasAction.major && this.unit.side === 'player') {
        this.selector.stateData.activeUnit = this.unit
        this.selector.stateData.activeSkill = clone(this.unit.actions.filter((action) => action.NAME === 'RESTMAJOR')[0])
        // this.selector.stateData.activeSkill.prevTargs.push(this.unit)
        // this.selector.stateData.activeSkill.targetRules.shift()
        this.selector.onClicks.execute(this.selector, this.unit)
      }
      // alert(this.unit.name)
    }
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
    /* width: 25%; */
    /* height: auto; */
  }
  .wind {
    /* background-color: #ddd; */
    border-radius: 10px;
    /* margin: 5px; */
    /* height: 22vh; */
    /* display: flex; */
    /* height: 320px */
  }
  .highlightWind {
    border-radius: 0px;
  }

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
  /* .active {
    background-color: #4cd;
  }
  .canTarget {
    background-color: #c26;
  } */
</style>
