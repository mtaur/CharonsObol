<template>
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
        :style="getHeaderStyle(col.label)"
        class="q-pa-none q-gutter-xs"
        >
        <!-- style="font-size: 11px; background-color: #cef" -->
        <!-- :style="{ fontSize: '11px'; backgroundColor: '#cef' }" -->
        {{ col.label }}
        </q-th>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props='props' class="q-pa-none q-gutter-xs" :style="getEntryStyle(props)">
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <div class="q-pa-sm">
      <q-card class="q-pa-xs">
        <div>
          <span class="text-h6">Flat bonuses:</span>
          <span v-for="bonus in flatBonuses(unit)" :key="bonus.statName">
            {{ bonus.statName }}: {{ bonus.value > 0 ? '+' : '' }}{{ bonus.value }}{{ bonus.isLast ? '' : ', ' }}
          </span>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
// import { openURL } from 'quasar'
// import unitdetail from 'src/components/unitdetail'
import { Stat } from 'src/game/objects/units/Stat.js'
// import actionsInfo from './actionsInfo'

export default {
  name: 'soulTable',
  props: ['selector', 'unit'], // , 'activeUnit', 'playerTeam'],
  // props: ['unit'], // , 'activeUnit', 'playerTeam'],
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  computed: {
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
          // let matrix = this.unit.getScalingMatrix.scalingMatrixWeightedFinal
          let val = matrix.filter((item) => item.from === fromStatName && item.to === toStatName)[0].value
          row[toStatName] = Math.round(val * 100) / 100
        }
        rows.push(row)
      }
      return rows
    }
  },
  methods: {
    getHeaderStyle (colName) {
      let colStyleVector = this.unit.getScalingMatrix.colSumsWeightedFinal
      // let compareVal = props.col.name === 'name' || props.row.name === 'name' ? 0 : stylingMatrix.filter(
      //   (entry) => {
      //     return entry.from === props.row.name && entry.to === props.col.name
      //   })[0].value
      let compareVal = colStyleVector[colName]

      let style = {
        fontSize: '11px'
      }
      if (colName !== 'from/to') {
        style.backgroundColor = '#cef'
        if (compareVal >= 0.2) {
          style.color = 'green'
        } else if (compareVal >= -0.4 && compareVal < 0) {
          style.color = 'orange'
        } else if (compareVal < -0.4) {
          style.color = 'red'
        }
      }
      // if (colName === 'from/to') {
      //   return {
      //     fontSize: '11px'
      //   }
      // } else {
      //   return {
      //     fontSize: '11px',
      //     backgroundColor: '#cef',
      //   }
      // }
      return style
    },
    getEntryStyle (props) {
      let style = {}
      let stylingMatrix = this.unit.getScalingMatrix.scalingMatrixWeightedFinal
      let compareVal = props.col.name === 'name' || props.row.name === 'name' ? 0 : stylingMatrix.filter(
        (entry) => {
          return entry.from === props.row.name && entry.to === props.col.name
        })[0].value

      style.fontWeight = 'bold'
      style.fontSize = '11px' // props.col.name === props.row.name ? '12px' : '8px'
      style.backgroundColor = props.col.name === props.row.name ? '#cef' : '#abc'
      // if (props.col.name === 'name') { style.backgroundColor = 'white' }
      let rowsVector = this.unit.getScalingMatrix.rowSumsWeightedFinal

      if (props.col.name === 'name') {
        style.backgroundColor = '#cef' // 'white'
        if (rowsVector[props.value] >= 0.2) {
          style.color = 'green'
        } else if (rowsVector[props.value] < 0 && rowsVector[props.value] >= -0.4) {
          style.color = 'orange'
        } else if (rowsVector[props.value] < -0.4) {
          style.color = 'red'
        }
      }
      // Diagonal does not need weights for self-comparison
      if (props.col.name === props.row.name) {
        if (props.value >= 1.1) { style.color = 'green' }
        if (props.value < 1 && props.value >= 0.8) { style.color = 'orange' }
        if (props.value < 0.8) {
          style.color = 'red'
          style.fontSize = '12px'
        }
      } else {
        // if (props.value >= 0.1) {
        if (compareVal >= 0.1) {
          style.color = 'green'
          style.fontSize = '12px'
        }
        // if (props.value < -0.1 && props.value >= -0.25) { style.color = 'orange' }
        // if (props.value < -0.25) {
        if (compareVal < -0.1 && compareVal >= -0.25) { style.color = 'orange' }
        if (compareVal < -0.25) {
          style.color = 'red'
          style.fontSize = '12px'
        }
      }
      return style
    },
    flatBonuses (unit) {
      let arr = []
      for (let statName in Stat.LIB) {
        arr.push({ statName: statName, value: 0, isLast: false })
      }
      let findEntry = (str) => { return arr.filter((entry) => entry.statName === str)[0] }
      for (let soulIndex in unit.souls) {
        let soul = unit.souls[soulIndex]
        for (let bonusStr in soul.bonus) {
          findEntry(bonusStr).value += soul.bonus[bonusStr]
          // arr.push({ statName: bonusStr, value: soul.bonus[bonusStr] })
        }
      }
      for (let itemIndex in unit.items) {
        let item = unit.items[itemIndex]
        for (let bonusStr in item.statBonus) {
          findEntry(bonusStr).value += item.statBonus[bonusStr]
          // arr.push({ statName: bonusStr, value: soul.bonus[bonusStr] })
        }
      }
      arr = arr.filter((entry) => { return entry.value !== 0 })
      // console.log(arr.length)
      if (arr.length > 0) {
        arr[arr.length - 1].isLast = true
      }
      return arr
    }
  },
  components: {
    // actionsInfo
    // smallUnit
    // unitdetail
  }
}
</script>

<style>
</style>
