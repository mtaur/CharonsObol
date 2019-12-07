<template>
  <div>
    <h4 class="row justify-center">Metaphysical Forge</h4>
    <div v-if="itemStoreGameObj.length > 0" class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <q-card class="q-gutter-md bg-blue-grey-3">
          <q-card-section>
            <div class="row text-h4 q-pa-sm justify-center items-center">
              <div class="text-amber-9">
                Equipment
              </div>
            </div>
            <div>
              All sales are final and binding.  No refunds or transfers.
            </div>
            <div class="row text-caption">
              <div v-for="item in itemStoreGameObj" :key="item.NAME">
              <!-- <div class="col-3" v-for="item in itemStoreGameObj" :key="item.NAME"> -->
                <q-chip square
                class="glossy"
                :style="itemStyle(item)"
                clickable @click="selectItem(item)"
                :color="buttonColor(item)" text-color="white">
                <!-- clickable @click="targLog(action)" -->
                <!-- clickable @click="skillClick(action)" -->
                  <!-- <q-avatar>
                    <img :src="getIcon(item)">
                  </q-avatar> -->
                  {{ item.name }}
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" content-class="bg-teal" max-width="20vw">
                      <span style="font-size: 14px">
                        <h6>
                          {{ item.name }}
                          <div v-if="item.cost > 0" :style="{ color: 'blue' }">
                            {{ item.cost }} SP
                          </div>
                        </h6>
                        <div>
                          {{ item.desc }}
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
    <div v-if="activeUnit.id && inspectItem.id && canAfford(inspectItem)" class="column items-center">
      <q-btn size="xl" color="amber" @click="purchaseItem()">Wield item</q-btn>
      Make sure you have selected the unit you want to have this!
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
// import { Unit } from 'src/game/objects/units/Unit.js'
import { Item } from 'src/game/objects/items/Item.js'
// import { UnitTemplate } from 'src/game/objects/units/templates/UnitTemplate.js'
import { mapGetters, mapMutations } from 'vuex'
// import { Soul } from 'src/game/objects/souls/Soul.js'

export default {
  name: 'newCharItems',
  props: ['selector'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      itemStoreGameObj: []
      // lostSoulsGameObj: [],
      // lostSouls: []
    }
  },
  computed: {
    activeUnit () {
      return this.selector.stateData.activeUnit
    },
    inspectItem () {
      return this.selector.stateData.inspectItem
    },
    // inspectUnit () {
    //   return this.selector.stateData.inspectUnit
    // },
    ...mapGetters('itemsForSale', ['itemsForSale'])
  },
  methods: {
    ...mapMutations('itemsForSale', ['buyItem']),
    purchaseItem () {
      let itemName = this.inspectItem.NAME
      let item = new Item.LIB[itemName]()
      item.equipTo(this.activeUnit)
      // let soulName = this.inspectUnit.souls[0].NAME
      // this.activeUnit.addSoul(soulName)
      // this.activeUnit.souls.push(new Soul.LIB[soulName]())
      // this.activeUnit.name = this.activeUnit.souls[0].name
      // this.activeUnit.NAME = this.activeUnit.souls[0].NAME
      this.$store.commit('itemsForSale/buyItem', itemName)
      this.selector.stateData.inspectItem = ''
      // this.selector.stateData.inspectUnit = {}
      this.computeItems()
    },
    computeItems () {
      this.itemStoreGameObj = []

      let addItem = (itemStr) => {
        let item = new Item.LIB[itemStr]()
        // unit.isLostSoul = true
        return item
      }

      for (let index in this.itemsForSale) {
        this.itemStoreGameObj.push(addItem(this.itemsForSale[index]))
      }
    },
    canAfford (item) {
      return this.selector.game.playerTeam.SP > item.cost
    },
    selectItem (item) {
      // action.targSelect(selector)
      if (this.selector.stateData.inspectItem.name === item.name) {
        this.selector.stateData.inspectItem = {}
      } else {
        this.selector.stateData.inspectItem = item
      }
    },
    itemStyle (item) {
      if (this.selector.stateData.inspectItem.name === item.name) {
        return {
          // backgroundColor: 'amber',
          height: '40px',
          fontSize: '18px'
        }
      } else if (this.canAfford(item)) {
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
    buttonColor (item) {
      if (this.selector.stateData.inspectItem.name === item.name) return 'amber'
      else if (this.canAfford(item)) return 'indigo'
      else return 'blue-grey'
    }
  },
  components: {
    // smallUnit,
    // newUnitInfo
    // unitdetail
  },
  created: function () {
    this.computeItems()
  }
}
</script>

<style>
</style>
