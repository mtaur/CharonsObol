import { classdir as itemLib } from './jsload.js'
// import { hasIn as hasProp, cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
// import { cloneDeep as clone } from 'lodash'

// console.log(Soul)
class Item {
  // static NAME = 'BROCANTRIP'
  static LIB = {}
  static itemId = 1

  NAME = 'JUNK'
  name = 'Junk'
  desc = 'This is a template. It does nothing.'
  cost = 0
  tier = 'CHEAP' // common, fine, ???
  equip = [] // [ ['HEAD'], ['MAINHAND', 'OFFHAND'] ]
  skills = [] // ['CRANK'] (ARBALEST)
  passives = [
    // {
    //   name: 'damagetopoisonin',
    //   NAME: 'DAMAGETOPOISONIN',
    //   params: {}
    // }
  ]

  statBonus = { MELEE: 0 }
  converts = [] // [{ from: 'DRED', to: 'DREF', value: 1 }, ...]
  replacements = [] // [{ statName: 'MAGIC', value: function (unit) { return 27.18 } }, ...]
  //
  unit = null
  // function (unit, validSlotArrayForItem)
  equipTo = function (unit) {
    unit.equip(this)
    // if (this.unit === null) {
    //   // Don't exceed new max.  Gain resource increase to current value.
    //   let copy = clone(unit)
    //   copy.items.push(this)
    //   let stats = unit.effectiveStatValues
    //   let cloneStats = copy.effectiveStatValues
    //   for (let key in stats) {
    //     let diff = cloneStats[key] - stats[key]
    //     console.log('key:', key, 'diff:', diff)
    //     if (unit.baseStats[key].isResource) {
    //       if (diff > 0) {
    //         unit.baseStats[key].current += diff
    //         // stat.current += diff
    //       }
    //       if (unit.baseStats[key].current > copy.effectiveStatValues[key]) {
    //         // stat.current = copy.effectiveStatValues[statName]
    //         unit.baseStats[key].current = copy.effectiveStatValues[key]
    //       }
    //     }
    //   }
    //
    //   unit.items.push(this)
    //   this.unit = unit
    // }
  }

  constructor (obj) {
    for (let propName in obj) {
      if (hasProp(this, propName)) {
        this[propName] = obj[propName]
      } else { alert('Item constructor: Missing prop', propName) }
    }
    this.id = Item.itemId
    Item.itemId++
    // this.name = obj.name
    // this.statBonus = obj.statBonus
    // this.desc = obj.desc
    // this.equip = obj.equip
    // this.replacements = this.replacements
    // this.tier = obj.tier
    //
    // validate???
  }
}

// populate library using jsload from ./bulk
for (let key in itemLib) {
  let NamedItem = itemLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  if (!Item.LIB[NamedItem.NAME]) { Item.LIB[NamedItem.NAME] = NamedItem }
}

export { Item }
