<template>
  <div>
    <h4 class="row justify-center">Potions and Parchments</h4>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <q-card class="q-gutter-md bg-blue-grey-3">
          <q-card-section>
            <div class="row text-h4 q-pa-sm justify-center items-center">
              <div class="text-amber-9">
                Consumables
              </div>
            </div>
            <div>
              Sales are final. SP is refunded when consumable is expended! Refunds not available in store.
            </div>
            <div class="row text-caption">
            <!-- <div class="row text-caption" :key="scrollKey"> -->
              <!-- <div class="col-3" v-for="unit in lostSoulsGameObj" :key="unit.id">
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div> -->
              <!-- <div class="col-3" v-for="scroll in scrollList" :key="scroll.NAME"> -->
              <!-- <div v-for="scroll in scrollList" :key="scroll.NAME"> -->
              <div v-for="scroll in scrollList" :key="generateKey(scroll)">
                <q-chip square
                class="glossy"
                :style="scrollStyle(scroll)"
                clickable @click="selectItem(scroll)"
                :color="buttonColor(scroll)" text-color="white">
                <!-- clickable @click="targLog(action)" -->
                <!-- clickable @click="skillClick(action)" -->
                  <q-avatar>
                    <img :src="getIcon(scroll)">
                  </q-avatar>
                  {{ scroll.name }}
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
                      <span style="font-size: 14px">
                        <h6>
                          {{ scroll.name }}
                          <div v-if="scroll.SPCost > 0" :style="{ color: 'blue' }">
                            {{ scroll.SPCost }} SP
                          </div>
                        </h6>
                        <div>
                          {{ scroll.desc }}
                        </div>
                      </span>
                  </q-tooltip>
                </q-chip>
                <!-- <smallUnit :unit="unit" :selector="selector"></smallUnit> -->
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-2"></div>
    </div>
    <div v-if="canAfford(inspectScroll) === true" class="column items-center" :key="selector.updateKey">
      <q-btn size="xl" color="amber" @click="purchaseScroll(inspectScroll)">Allot SP to bring along a(nother) copy of this consumable!</q-btn>
    </div>
    <!-- <newUnitInfo v-if="selector.stateData.inspectUnit.name"
    :selector="selector"
    :unit="selector.stateData.inspectUnit"></newUnitInfo> -->
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
// import smallUnit from './smallUnit'
// import newUnitInfo from './newUnitInfo'
import { Unit } from 'src/game/objects/units/Unit.js'
import { Action } from 'src/game/objects/actions/Action.js'
import { hasIn as hasProp } from 'lodash'
// import { UnitTemplate } from 'src/game/objects/units/templates/UnitTemplate.js'
// import { mapGetters, mapMutations } from 'vuex'
// import { Soul } from 'src/game/objects/souls/Soul.js'

export default {
  name: 'newCharScrolls',
  props: ['selector'], // , 'activeUnit', 'playerTeam'],
  data () {
    let skillList = []
    let dummy = new Unit()
    for (let NAME in Action.LIB) {
      let skill = new Action.LIB[NAME](dummy)
      skillList.push(skill)
    }
    let scrollList = skillList.filter((skill) => skill.isConsumable && skill.include && !skill.isTransient)

    return {
      // scrollKey: 0,
      scrollList: scrollList
      // itemStoreGameObj: []
      // lostSoulsGameObj: [],
      // lostSouls: []
    }
  },
  computed: {
    activeUnit () {
      return this.selector.stateData.activeUnit
    },
    inspectScroll () {
      return this.selector.stateData.inspectScroll
    } // ,
    // inspectUnit () {
    //   return this.selector.stateData.inspectUnit
    // },
    // ...mapGetters('itemsForSale', ['itemsForSale'])
  },
  methods: {
    // ...mapMutations('itemsForSale', ['buyItem']),
    generateKey (scroll) {
      return scroll.NAME + this.selector.game.playerTeam.inventory[scroll.NAME]
    },
    purchaseScroll (scroll) {
      // let NAME = this.inspectScroll.NAME
      // let inventory = this.selector.game.playerTeam.inventory
      // this.selector.updateKey++

      // if (this.skillList[NAME].SPCost <= this.selector.game.playerTeam.SP) {
      if (this.canAfford(scroll)) {
        this.selector.game.playerTeam.purchaseScroll(scroll)
        // inventory[NAME] = hasProp(inventory, NAME) ? inventory[NAME] + 1 : 1
        this.selector.updateKey++
      }
      // this.selector.stateData.activeUnit = this.activeUnit
      // this.scrollKey++
      // if (!hasProp(inventory, NAME)) { inventory[NAME] = 0 }
      // this.selector.game.playerTeam.inventory[NAME]++
    },
    canAfford (scroll) {
      return hasProp(scroll, 'NAME') && this.selector.game.playerTeam.SP >= scroll.SPCost
    },
    selectItem (scroll) {
      // action.targSelect(selector)
      if (this.selector.stateData.inspectScroll.name === scroll.name) {
        this.selector.stateData.inspectScroll = {}
      } else {
        this.selector.stateData.inspectScroll = scroll
      }
    },
    scrollStyle (scroll) {
      if (this.selector.stateData.inspectScroll.name === scroll.name) {
        return {
          // backgroundColor: 'amber',
          height: '40px',
          fontSize: '18px'
        }
      } else if (this.canAfford(scroll)) {
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
    buttonColor (scroll) {
      if (this.selector.stateData.inspectScroll.name === scroll.name) return 'amber'
      else if (this.canAfford(scroll)) return 'indigo'
      else return 'blue-grey'
    },
    getIcon (scroll) {
      if (scroll.type === 'both') { return 'statics/gameIcons/action-both.png' }
      if (scroll.type === 'major') { return 'statics/gameIcons/action-star.png' }
      if (scroll.type === 'minor') { return 'statics/gameIcons/action-dot.png' }
      return 'statics/gameIcons/action-none.png'
      // if (action.type === 'both') { return 'statics/icons/action-both.png' }
      // if (action.type === 'major') { return 'statics/icons/action-star.png' }
      // if (action.type === 'minor') { return 'statics/icons/action-dot.png' }
      // return 'statics/icons/action-none.png'
    }
  },
  components: {
    // smallUnit,
    // newUnitInfo
    // unitdetail
  },
  created: function () {
    // this.computeItems()
  }
}
</script>

<style>
</style>
