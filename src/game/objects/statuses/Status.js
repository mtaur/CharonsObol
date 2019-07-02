import { classdir as statusLib } from './jsload.js'
// import { hasIn as hasProp, cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
// import { cloneDeep as clone } from 'lodash'

// console.log(Soul)
class Status {
  // static NAME = 'BROCANTRIP'
  static LIB = {}

  // NAME: 'GUARD',
  // name: 'guard',
  // desc: 'Increased DRED stat.  Interrupts targeting of melee or ranged skills.',
  // remove: [
  //   'DAMAGE',
  //   'USETURN'
  // ],
  // effects: [
  //   // { trigger: , effect: }
  // ],
  // bonus: [],
  // converts: [
  //   {
  //     from: 'DRED',
  //     to: 'DRED',
  //     value: 1
  //   }
  // ]
  NAME = 'IDLE'
  name = 'Idle'
  desc = 'This is a template. It does nothing.'
  upkeep = 0
  remove = []
  effects = []
  bonus = []
  converts = [] // [{ from: 'DRED', to: 'DREF', value: 1 }, ...]
  replacements = [] // [{ statName: 'MAGIC', value: function (unit) { return 27.18 } }, ...]
  //
  unit = null
  // function (unit, validSlotArrayForItem)
  equipTo = function (unit) {
    unit.equip(this)
  }
  clearCheck = function (unit, trigger) {
    console.log('this:', this)
    console.log('trigger:', trigger)
    for (let index in this.remove) {
      let cond = this.remove[index]
      console.log('cond:', cond)
      if (cond === trigger) {
        console.log('should clear something...')
        this.clear(unit)
      } // return true
    }
    // return false
  }
  clear = function (unit) {
    console.log('Clear this:', this)
    console.log('unit:', unit)
    for (let index in unit.statuses) {
      if (unit.statuses[index].NAME === this.NAME) {
        console.log('splice!!!!')
        unit.statuses.splice(index, 1)
      }
    }
  }

  constructor (obj) {
    for (let propName in obj) {
      if (hasProp(this, propName)) {
        this[propName] = obj[propName]
      } else { alert('Item constructor: Missing prop', propName) }
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
for (let key in statusLib) {
  let NamedStatus = statusLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  if (!Status.LIB[NamedStatus.NAME]) { Status.LIB[NamedStatus.NAME] = NamedStatus }
}

export { Status }
