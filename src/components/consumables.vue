<template>
<!-- <div class="col-3 wind justify-center align-center"> -->
<div class="col-3 justify-center align-center">
  <div class="row items-center justify-center">
    <div v-for="action in sortedActions" :key="action.name" class="justify-center">
    <!-- <div v-for="action in unit.actions" :key="action.name" class="justify-center"> -->
      <q-chip square v-if="canUse(action)"
      class="glossy"
      :style="actionStyle(action)"
      clickable @click="targSelect(action)"
      :color="buttonColor(action)" text-color="white">
        <q-avatar>
          <img :src="getIcon(action)">
        </q-avatar>
        {{ action.name }} ({{ playerTeam.inventory[action.NAME] }})
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
            <span style="font-size: 14px">
              <h6>
                {{ action.name }}
                <div v-if="action.cost > 0" :style="{ color: 'blue' }">
                  {{ action.cost }} MP
                </div>
              </h6>
              <div>
                {{ action.desc }}
              </div>
            </span>
        </q-tooltip>
      </q-chip>
      <q-chip square dense v-else :color="buttonColor(action)" text-color="white">
        <q-avatar>
          <img :src="getIcon(action)">
        </q-avatar>
        {{ action.name }} ({{ playerTeam.inventory[action.NAME] }})
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
            <span style="font-size: 14px">
              <h6>
                {{ action.name }}
                <div v-if="action.cost > 0 && action.cost > unit.baseStats.MP.current" :style="{ color: 'red' }">
                  {{ action.cost }} MP
                </div>
                <div v-if="action.cost > 0 && action.cost <= unit.baseStats.MP.current" :style="{ color: 'blue' }">
                  {{ action.cost }} MP
                </div>
              </h6>
              <div>
                {{ action.desc }}
              </div>
            </span>
        </q-tooltip>
      </q-chip>
    </div>
  </div>
</div>
</template>

<script>
// import statrow from './statchange.vue'
// import itemTooltip from './itemTooltip.vue'
// import { sort } from 'lodash'

export default {
  props: ['unit', 'playerTeam', 'cpuTeam', 'selector'],
  components: {},
  data () {
    return {
    }
  },
  methods: {
    getIcon (action) {
      if (action.type === 'both') { return 'statics/icons/action-both.png' }
      if (action.type === 'major') { return 'statics/icons/action-star.png' }
      if (action.type === 'minor') { return 'statics/icons/action-dot.png' }
      return 'statics/icons/action-none.png'
    },
    canUse (action) {
      // if (action.type === 'both') { return this.unit.hasAction.major && this.unit.hasAction.minor }
      // if (action.type === 'major') { return this.unit.hasAction.major }
      // if (action.type === 'minor') { return this.unit.hasAction.minor }
      // return true
      return action.canUseTree()
      // return action.canUse()
    },
    actionStyle (action) {
      if (this.selector.stateData.activeSkill.name === action.name) {
        return {
          // backgroundColor: 'amber',
          height: '40px',
          fontSize: '18px'
        }
      } else if (this.canUse(action)) {
        return {
          // backgroundColor: 'indigo',
          height: '32px',
          fontSize: '14px'
        }
      } else {
        return {
          // backgroundColor: 'blue-grey',
          height: '24px',
          fontSize: '12px'
        }
      }
    },
    buttonColor (action) {
      if (this.selector.stateData.activeSkill.name === action.name) return 'orange'
      else if (this.canUse(action)) return 'teal'
      // else if (this.canUse(action)) return 'indigo'
      else return 'grey'
    },
    buttonSize (action) {
      if (this.selector.stateData.activeSkill.name === action.name) return '40px'
      else return '32px'
    },
    fontSize (action) {
      if (this.selector.stateData.activeSkill.name === action.name) return '18px'
      else return '14px'
    },
    // targLog (action) {
    //   action.targLog()
    // },
    targSelect (action) {
      // action.targSelect(selector)
      if (this.selector.stateData.activeSkill.name === action.name) {
        this.selector.onClicks.unpickSkill(this.selector, action)
      } else {
        this.selector.onClicks.pickSkill(this.selector, action)
      }
      // battlefieldClick: function (selector, unit) {
      //   selector.getClickMode(unit).onClick(selector, unit)
      //   console.log(selector.getClickMode(unit))
      //   this.activeUnit = selector.stateData.activeUnit.id
      //     ? [selector.stateData.activeUnit]
      //     : []
      // }
      // action.targSelect(selector)
    },
    targLog (action) {
      action.targLog()
    },
    skillClick (action) {
      console.log('unit:', this.unit)
      console.log('action:', action)
      console.log('rule constructor:', action.targetRules[0])
      let rule = new action.targetRules[0]({
        caster: this.unit,
        playerTeam: this.playerTeam,
        cpuTeam: this.cpuTeam
      })
      // console.log('rule:', rule)
      // console.log('find:', rule.find())
      rule.find().forEach((item, index) => { console.log(item.name + ' is a possible target of ' + action.name) })
      // constructor (obj = {
      //   caster: {},
      //   reqs: [],
      //   nots: [],
      //   prefs: [],
      //   playerTeam: [],
      //   cpuTeam: [],
      //   prevTargs: [],
      //   // Vast majority of skills use these, MUST overwrite as bool if not:
      //   live: true,
      //   dead: false,
      //   field: true,
      //   bench: false
      // })
    }
  },
  computed: {
    sortedActions () {
      let val = (action) => { return action.type === 'minor' ? 1 : action.type === 'major' ? 2 : action.type === 'both' ? 3 : 9001 }
      let sortBy = (act1, act2) => { return val(act1) - val(act2) }
      let filt = (action) => action.NAME !== 'RESTMINOR' && action.NAME !== 'RESTMAJOR' && action.isConsumable === true && this.playerTeam.inventory[action.NAME] > 0
      return this.unit.actions.slice().sort(sortBy).filter(filt)
      // return this.unit.actions.slice().sort(sortBy).filter((action) => action.NAME !== 'RESTMINOR' && action.NAME !== 'RESTMAJOR')
    }
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
  .sized {
    width: 15vw;
  }

  .placebox {
    /* height: 110px; */
    margin: 10px 0 0 0;
  }
  /* .placeholder {
    background-color: #a77;
    width: 80px;
    height: 80px;
    margin: 5px 0 0 5px;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
    border-radius: 5px;
  } */

</style>
