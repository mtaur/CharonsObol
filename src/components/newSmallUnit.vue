<template>
  <div @click="unitClick()">
    <div class="q-pa-xs">
      <!-- <div v-if="unit.souls.length > 0 && selector.stateData.inspectUnit.id !== unit.id"> -->
      <q-avatar size="60px" v-if="unit.souls.length > 0 && selector.stateData.inspectUnit.id !== unit.id"
      :key="unit.souls[0].NAME">
      <!-- <q-avatar style="{width: '100%'}" v-if="unit.souls.length > 0 && selector.stateData.inspectUnit.id !== unit.id"
      :key="unit.souls[0].NAME"> -->
        <q-img :src="getImg(unit.souls[0])" />
      </q-avatar>
      <!-- </div> -->
      <q-img v-else-if="unit.souls.length > 0" :src="getImg(unit.souls[0])"/>
      <q-img v-else :src="'statics/gameIcons/souls/CAENEN.png'"/>
      <q-tooltip anchor="center left" self="center right" content-class="bg-teal-6" max-width="20vw">
          <span style="font-size: 14px">
            <div class="text-h6">
              {{ unit.name }}
            </div>
          </span>
      </q-tooltip>
    </div>
  </div>
</template>

<script>

export default {
  name: 'battleLog',
  props: ['selector', 'unit'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    getImg (soul) {
      // statics/icons/action-star.png
      return 'statics/gameIcons/souls/' + soul.NAME + '.png'
      // return 'statics/icons/souls/' + soul.NAME + '.png'
    },
    unitClick () {
      this.selector.stateData.activeUnit = this.unit
      // if (this.selector.stateData.activeUnit.id === this.unit.id) {
      //   this.selector.stateData.activeUnit = {}
      // } else {
      //   this.selector.stateData.activeUnit = this.unit
      // }
    }
  },
  components: {
    // unitdetail
  }
}
</script>

<style>
</style>
