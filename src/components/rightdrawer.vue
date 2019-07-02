<template>
  <q-drawer
    side="right"
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="250"
    :breakpoint="0"
  >

    <h4 class="row justify-center">Battle log</h4>
    <div class="row justify-center">
      <div class="row justify-center">
        <q-btn @click="toggleVerbose" color="blue">Verbose</q-btn>
      </div>
      <div class="row justify-center">
        <span class="row justify-center"
        v-for="item in selector.log" :key="selector.log.indexOf(item)">
          <div class="col-1"></div>
          <div class="col-10">
            <span v-if="show(item.type)" :style="actionStyle(item.type)">
              {{ item.text }}
            </span>
          </div>
          <div class="col-1"></div>
        </span>
      </div>
    </div>

    <!-- <unitdetail v-for="unit in activeUnit"
      :unit="unit"
      :key="unit.name">
    </unitdetail> -->
  </q-drawer>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'

export default {
  name: 'rightDrawer',
  props: ['visible', 'selector'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      verbose: false
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    show (type) {
      if (this.verbose) return true
      if (type === 'dred' || type === 'dref') {
        return false
      }
      return true
    },
    primary (type) {
      if (type !== 'dred' && type !== 'dref') return true
      return false
    },
    actionStyle (type) {
      if (type === 'dred' || type === 'dref') {
        return {
          fontSize: '12px'
        }
      } else {
        return {
          fontSize: '14px'
        }
      }
    },
    toggleVerbose () {
      this.verbose = !this.verbose
    }
    // openURL
  },
  components: {
    // unitdetail
  }
}
</script>

<style>
</style>
