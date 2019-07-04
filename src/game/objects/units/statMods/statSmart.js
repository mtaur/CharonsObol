// import { Stat } from '../Stat.js'
import { cloneDeep as clone } from 'lodash'
// import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

class StatSmart {
  // Don't allow resources to exceed new max.
  // Gain resource increase to current value.
  static applyChange (changer) {
    let copy = clone(this)
    changer(copy)
    // console.log('Copy after change:', copy)

    let unit = this
    let baseStats = unit.baseStats

    for (let key in unit.convertedStatValues) {
      let oldStatVal = unit.convertedStatValues[key]
      let newStatVal = copy.convertedStatValues[key]
      let diff = newStatVal - oldStatVal
      if (baseStats[key].isResource) {
        if (diff > 0) {
          baseStats[key].current += diff
        }
        if (baseStats[key].current > newStatVal) {
          baseStats[key].current = newStatVal
        }
      }
    }

    changer(this)
  }

  static equip (item) {
    function tryOn (unit) {
      // if (canEquip) { ... }
      // console.log('unit', unit)
      unit.items.push(item)
      item.unit = unit
    }
    this.applyChange(tryOn)
  }

  static levelUp (statName) {
    function raise (unit) {
      unit.baseStats[statName].increase()
    }
    let stat = this.baseStats[statName]

    if (this.playerTeam.SP >= stat.cost) {
      this.playerTeam.SP -= stat.cost
      this.applyChange(raise)
    }
  }
}

export { StatSmart }
