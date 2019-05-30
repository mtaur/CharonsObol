<template>
  <q-drawer
    v-model="visible"
    bordered
    content-class="bg-grey-2"
    :width="250"
    :breakpoint="0"
  >
    <div class="sp">
      <div>
        <h4 key='SP'>SP: {{ playerTeam.SP }}</h4>
      </div>
    </div>

    <unitdetail v-for="unit in activeUnit"
      :unit="unit"
      :cpuTeam = "cpuTeam"
      :playerTeam = "playerTeam"
      :selector = "selector"
      :key="unit.name">
    </unitdetail>
  </q-drawer>
</template>

<script>
import { openURL } from 'quasar'
import unitdetail from 'src/components/unitdetail'

export default {
  name: 'leftDrawer',
  props: ['visible', 'activeUnit', 'playerTeam', 'cpuTeam', 'selector'],
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  },
  components: { unitdetail }
}
</script>

<style>
  .sp {
    /* justify-content: center; */
    text-align: center;
  }
</style>
