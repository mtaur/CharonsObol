<template>
  <q-drawer
    side="right"
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="250"
    :breakpoint="0"
  >

    <h3>Battle logs go here?</h3>

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
  props: ['visible'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    // openURL
  },
  components: {
    // unitdetail
  }
}
</script>

<style>
</style>
