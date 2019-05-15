import { hasIn as hasProp } from 'lodash'
import { classdir as itemLib } from './jsload.js'

// console.log(Soul)
class Item {
  // static NAME = 'BROCANTRIP'
  static LIB = {}

  NAME = 'JUNK'
  name = 'Junk'
  desc = 'This is a template. It does nothing.'
  cost = 0
  tier = 'CHEAP' // common, fine, ???
  equip = [] // [ ['HEAD'], ['MAINHAND', 'OFFHAND'] ]

  statBonus = { MELEE: 0 }
  converts = [] // [{ from: 'DRED', to: 'DREF', value: 1 }, ...]
  replacements = [] // [{ statName: 'MAGIC', value: function (unit) { return 27.18 } }, ...]
  //
  unit = null
  // function (unit, validSlotArrayForItem)
  equipTo = function (unit) {
    if (this.unit === null) {
      unit.items.push(this)
      this.unit = unit
    }
  }

  constructor (obj) {
    for (let propName in obj) {
      if (hasProp(this, propName)) {
        this[propName] = obj[propName]
      } else { alert('Missing prop', propName) }
    }
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
