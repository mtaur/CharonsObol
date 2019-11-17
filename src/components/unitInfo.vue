<template>
  <div>
    <div class="q-pa-sm q-gutter-y-sm column items-center">
      <q-btn-group>
        <q-btn size="sm" color="amber-6" glossy label="Souls" @click="selector.stateData.infoPage='souls'"/>
        <q-btn size="sm" color="amber-6" glossy label="Statuses" @click="selector.stateData.infoPage='statuses'"/>
        <q-btn size="sm" color="amber-6" glossy label="Items" @click="selector.stateData.infoPage='items'"/>
        <q-btn size="sm" color="amber-6" glossy label="Actions" @click="selector.stateData.infoPage='actions'"/>
        <!-- <q-btn size="sm" color="amber-6" glossy label="Souls" @click="page='souls'"/>
        <q-btn size="sm" color="amber-6" glossy label="Statuses" @click="page='statuses'"/>
        <q-btn size="sm" color="amber-6" glossy label="Items" @click="page='items'"/>
        <q-btn size="sm" color="amber-6" glossy label="Actions" @click="page='actions'"/> -->
        <!-- <q-btn size="sm" color="amber-6" glossy label="Stat multipliers" @click="page='mult'" /> -->
      </q-btn-group>
    </div>

    <div class="justify-center text-center text-h4 q-pa-sm">
      {{ unit.name }}
    </div>
    <div v-if="page === 'souls'">
      <div class="q-pa-xs">
        <q-table
          title="Stat multipliers"
          dense
          :data="statMulData"
          :columns="statMulColumns"
          row-key="name"
          table-style="max-height: 400px"
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          hide-bottom>
          <template v-slot:header="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="font-size: 8px"
              class="q-pa-none q-gutter-xs"
            >
              {{ col.label }}
            </q-th>
          </template>
          <template v-slot:body-cell="props">
            <q-td :props='props' class="q-pa-none q-gutter-xs" :style="getEntryStyle(props)">
              {{ props.value }}
            </q-td>
          </template>
        </q-table>
      </div>
      <!-- <div class="q-pa-md">
        <q-table
          title="Treats"
          dense
          :data="data"
          :columns="columns"
          row-key="name"
        />
      </div> -->
      <div class="justify-center text-center text-h5 q-pa-sm">
        Souls
      </div>
      <div v-if="unit.souls.length === 0" class="text-h5">
        Soulless...
      </div>
      <div v-for="soul in unit.souls" :key="soul.name"
      class="justify-center text-center q-pa-sm">
        <q-card>
          <div class="text-h5 ">
            {{ soul.name }}
          </div>
          <!-- <div class="text-body1"> -->
          <!-- <div class="text-caption"> -->
          <div class="text-body2">
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
        </q-card>
        <!-- <q-separator inset></q-separator> -->
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
import { Stat } from 'src/game/objects/units/Stat.js'
import actionsInfo from './actionsInfo'

export default {
  name: 'unitInfo',
  props: ['selector', 'unit'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  computed: {
    page () {
      return this.selector.stateData.infoPage
    },
    statMulColumns () {
      let cols = [
        {
          name: 'name',
          required: true,
          label: 'from/to',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: false // true
        }
      ]
      for (let toStatName in Stat.LIB) {
        let entry = {
          name: toStatName,
          align: 'center',
          label: toStatName,
          field: toStatName,
          sortable: false // true
        }
        cols.push(entry)
      }
      return cols
    },
    statMulData () {
      let rows = []
      for (let fromStatName in Stat.LIB) {
        let row = {}
        row.name = fromStatName
        for (let toStatName in Stat.LIB) {
          let matrix = this.unit.getScalingMatrix.scalingMatrixFinal
          let val = matrix.filter((item) => item.from === fromStatName && item.to === toStatName)[0].value
          row[toStatName] = Math.round(val * 100) / 100
        }
        rows.push(row)
      }
      return rows
    }
  },
  methods: {
    getEntryStyle (props) {
      let style = {}
      style.fontWeight = 'bold'
      style.fontSize = props.col.name === props.row.name ? '12px' : '8px'
      if (props.col.name === props.row.name) {
        if (props.value >= 1.1) { style.color = 'green' }
        if (props.value < 1 && props.value >= 0.8) { style.color = 'orange' }
        if (props.value < 0.8) {
          style.color = 'red'
          style.fontSize = '12px'
        }
      } else {
        if (props.value >= 0.1) {
          style.color = 'green'
          style.fontSize = '12px'
        }
        if (props.value < -0.1 && props.value >= -0.25) { style.color = 'orange' }
        if (props.value < -0.25) {
          style.color = 'red'
          style.fontSize = '12px'
        }
      }
      return style
      // if (props.col.name === props.row.name) {
      // if (props.col.name === props.row.name) {
      //   return { fontSize: '10px', fontWeight: 'bold' }
      // } else {
      //   return { fontSize: '8px', fontWeight: 'bold' }
      // }
    }
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
