<template>
  <div>
    <div class="q-pa-md q-gutter-y-md column items-start">
      <q-btn-group>
        <q-btn size="sm" color="amber-6" glossy label="Souls" @click="page='souls'"/>
        <!-- <q-btn size="sm" color="amber-6" glossy label="Stat multipliers" @click="page='mult'" /> -->
        <q-btn size="sm" color="amber-6" glossy label="Statuses" @click="page='statuses'"/>
        <q-btn size="sm" color="amber-6" glossy label="Items" @click="page='items'"/>
        <q-btn size="sm" color="amber-6" glossy label="Actions" @click="page='actions'"/>
      </q-btn-group>
    </div>

    <div class="justify-center text-center text-h4 q-pa-md">
      {{ unit.name }}
    </div>
    <div v-if="page === 'souls'">
      <div class="justify-center text-center text-h5 q-pa-md">
        Souls
      </div>
      <div v-if="unit.souls.length === 0" class="text-h6">
        Soulless...
      </div>
      <div v-for="soul in unit.souls" :key="soul.name"
      class="justify-center text-center">
        <div class="text-h6 ">
          {{ soul.name }}
        </div>
        <div class="text-body1">
          {{ soul.desc }}
        </div>
        <div class="text-h6">
          Stat multipliers:
        </div>
        <div class="text-body1" v-for="mult in soul.converts" :key="mult.from + mult.to">
          <div v-if="mult.from === mult.to">
            <span class="text-color-amber-4">{{ mult.value * 100 }}%</span> base {{ mult.from }} modifier
          </div>
          <div v-else>
            <span class="text-color-amber-4">{{ mult.value * 100 }}%</span> of {{ mult.from }} added to {{ mult.to }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="page === 'statuses'">
      <div v-if="unit.statuses.length === 0">
        No status effects right now...
      </div>
      <div v-else>
        <div v-for="status in unit.statuses" :key="status.name">
          <span class="text-h6">{{ status.name }} - </span> {{ status.desc }}
        </div>
      </div>
    </div>
    <div v-if="page === 'items'" class="row items-center justify-center">
      <div class="col-8">
        <div v-for="item in unit.items" :key="item.name" class="row justify-center">
          <strong>{{ item.name }}</strong>
          <!-- <itemTooltip :item="item" :unit="unit"></itemTooltip> -->
          {{ item.desc }}
        </div>
      </div>
      <!-- <div class="col-4">
        <q-btn color="teal" glossy label="Items"></q-btn>
      </div> -->
    </div>
    <div v-if="page === 'actions'">
      <actionsInfo :unit="unit" :selector="selector"></actionsInfo>
    </div>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
import actionsInfo from './actionsInfo'

export default {
  name: 'unitInfo',
  props: ['selector', 'unit'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      page: 'souls'
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    actionsInfo
    // smallUnit
    // unitdetail
  }
}
</script>

<style>
</style>
