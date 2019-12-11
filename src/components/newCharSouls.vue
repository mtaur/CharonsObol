<template>
  <div>
    <h4 class="row justify-center">Book of Souls</h4>
    <div v-if="lostSoulsGameObj.length > 0" class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <q-card class="q-gutter-md bg-blue-grey-3">
          <q-card-section>
            <div class="row text-h4 q-pa-sm justify-center items-center">
              <div class="text-amber-9">
                Lost Souls
              </div>
            </div>
            <div class="row text-caption">
              <!-- <div class="col-3" v-for="unit in selector.game.cpuTeam.back" :key="unit.id"> -->
              <div class="col-3" v-for="unit in lostSoulsGameObj" :key="unit.id">
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div>
            </div>
            <!-- <div class="row text-caption">
              <div class="col-3" v-for="unit in selector.game.cpuTeam.front" :key="unit.id">
                <smallUnit :unit="unit" :selector="selector"></smallUnit>
              </div>
            </div> -->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-2"></div>
    </div>
    <!-- <div v-if="activeUnit.id && inspectUnit.id && inspectUnit.isLostSoul === true" class="column items-center"> -->
    <div v-if="canAddSoul()" class="column items-center">
      <q-btn size="xl" color="amber" @click="claimSoul()">Graft soul {{ 10 * (1 + activeUnit.souls.length) }}</q-btn>
    </div>
    <newUnitInfo v-if="selector.stateData.inspectUnit.name"
    :selector="selector"
    :unit="selector.stateData.inspectUnit"></newUnitInfo>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
import smallUnit from './smallUnit'
import newUnitInfo from './newUnitInfo'
// import { Unit } from 'src/game/objects/units/Unit.js'
import { UnitTemplate } from 'src/game/objects/units/templates/UnitTemplate.js'
import { mapGetters, mapMutations } from 'vuex'
// import { Soul } from 'src/game/objects/souls/Soul.js'

export default {
  name: 'newCharSouls',
  props: ['selector'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      lostSoulsGameObj: [] // ,
      // lostSouls: []
    }
  },
  computed: {
    activeUnit () {
      return this.selector.stateData.activeUnit
    },
    inspectUnit () {
      return this.selector.stateData.inspectUnit
    },
    ...mapGetters('lostSouls', ['lostSouls'])
  },
  methods: {
    ...mapMutations('lostSouls', ['claimSoul']),
    claimSoul () {
      let soulName = this.inspectUnit.souls[0].NAME
      this.activeUnit.addSoul(soulName)
      // this.activeUnit.souls.push(new Soul.LIB[soulName]())
      this.activeUnit.name = this.activeUnit.souls[0].name
      this.activeUnit.NAME = this.activeUnit.souls[0].NAME
      this.$store.commit('lostSouls/claimSoul', soulName)
      this.selector.stateData.inspectUnit = {}
      this.computeSouls()
    },
    computeSouls () {
      this.lostSoulsGameObj = []

      let addLostSoul = (soulStr) => {
        let unit = new UnitTemplate.LIB.HERO({ soulsArr: [soulStr], itemsArr: [], pos: 'front', side: 'player', lvlUp: {} },
          { playerTeam: this.selector.game.playerTeam, cpuTeam: this.selector.game.cpuTeam })
        unit.isLostSoul = true
        return unit
      }

      for (let index in this.lostSouls) {
        this.lostSoulsGameObj.push(addLostSoul(this.lostSouls[index]))
      }
    },
    canAddSoul () {
      let logic = this.activeUnit.id && this.inspectUnit.id && this.inspectUnit.isLostSoul === true
      return logic && this.selector.game.playerTeam.SP >= 10 * (this.activeUnit.souls.length + 1)
    }
  },
  components: {
    smallUnit,
    newUnitInfo
    // unitdetail
  },
  created: function () {
    this.computeSouls()
    // this.lostSouls = []
    // this.lostSoulsGameObj = []
    //
    // let addLostSoul = (soulStr) => {
    //   let unit = new UnitTemplate.LIB.HERO({ soulsArr: [soulStr], itemsArr: [], pos: 'front', side: 'player', lvlUp: {} },
    //     { playerTeam: this.selector.game.playerTeam, cpuTeam: this.selector.game.cpuTeam })
    //   return unit
    // }
    //
    // for (let index in this.lostSouls) {
    //   this.lostSoulsGameObj.push(addLostSoul(this.lostSouls[index]))
    // }
  }
}
</script>

<style>
</style>
