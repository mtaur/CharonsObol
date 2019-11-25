<template>
<div class="wind justify-center align-center">
  <div class="row items-center justify-center">
    <div v-for="action in sortedActions" :key="action.name" class="justify-center">
    <!-- <div v-for="action in unit.actions" :key="action.name" class="justify-center"> -->
      <q-chip square dense
      class="glossy"
      :style="actionStyle(action)"
      :color="buttonColor(action)" text-color="white">
        <q-avatar>
          <img :src="getIcon(action)">
        </q-avatar>
        {{ action.name }}
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
    </div>
  </div>
</div>
</template>

<script>
// import statrow from './statchange.vue'
// import itemTooltip from './itemTooltip.vue'
// import { sort } from 'lodash'

export default {
  props: ['unit', 'selector'],
  components: {},
  data () {
    return {
    }
  },
  methods: {
    getIcon (action) {
      if (action.type === 'both') { return 'statics/gameIcons/action-both.png' }
      if (action.type === 'major') { return 'statics/gameIcons/action-star.png' }
      if (action.type === 'minor') { return 'statics/gameIcons/action-dot.png' }
      return 'statics/gameIcons/action-none.png'
      // if (action.type === 'both') { return 'statics/icons/action-both.png' }
      // if (action.type === 'major') { return 'statics/icons/action-star.png' }
      // if (action.type === 'minor') { return 'statics/icons/action-dot.png' }
      // return 'statics/icons/action-none.png'
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
      return {
        height: '32px',
        fontSize: '14px'
      }
    },
    buttonColor (action) {
      // if (this.selector.stateData.activeSkill.name === action.name) return 'amber'
      // else if (this.canUse(action)) return 'indigo'
      // else return 'blue-grey'
      return 'indigo'
      // if (this.canUse(action)) return 'indigo'
      // else return 'blue-grey'
    },
    buttonSize (action) {
      // if (this.selector.stateData.activeSkill.name === action.name) return '40px'
      // else return '32px'
      return '28px'
    },
    fontSize (action) {
      // if (this.selector.stateData.activeSkill.name === action.name) return '18px'
      // else return '14px'
      return '10px'
      // if (this.selector.stateData.activeSkill.name === action.name) return '14px'
      // else return '10px'
    },
    // targLog (action) {
    //   action.targLog()
    // },
    targLog (action) {
      action.targLog()
    }
  },
  computed: {
    sortedActions () {
      let val = (action) => { return action.type === 'minor' ? 1 : action.type === 'major' ? 2 : action.type === 'both' ? 3 : 9001 }
      let sortBy = (act1, act2) => { return val(act1) - val(act2) }
      return this.unit.actions.slice().sort(sortBy)
        .filter((action) => action.NAME !== 'RESTMINOR' && action.NAME !== 'RESTMAJOR')
        .filter((action) => !action.isConsumable)
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
