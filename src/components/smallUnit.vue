<template>
  <div @click="unitClick()">
    <div class="q-pa-xs">
      <q-img v-if="unit.souls.length > 0" :src="getImg(unit.souls[0])"/>
      <q-img v-else :src="'statics/gameIcons/souls/CAENEN.png'"/>
      <!-- <q-img
      src="wharrgarbl"
      :ratio="1"
      >
        <template v-slot:error>
          <div class="text-caption absolute-full flex flex-center bg-pink-9 text-white items-center justify-center">
            (unit image)
          </div>
        </template>
      </q-img> -->
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
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'

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
      if (this.selector.stateData.inspectUnit.id === this.unit.id) {
        this.selector.stateData.inspectUnit = {}
      } else {
        this.selector.stateData.inspectUnit = this.unit
      }
    }
  },
  components: {
    // unitdetail
  }
}
</script>

<style>
</style>
