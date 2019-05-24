import { classdir as actionLib } from './jsload.js'
// import { hasIn as hasProp, cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
import { TargetRule } from './targetRules/TargetRule.js'
// import { cloneDeep as clone } from 'lodash'

// console.log(Soul)
class Action {
  // static NAME = 'BROCANTRIP'
  static LIB = {}

  // { name: 'melee', type: 'major', desc: 'Basic malee attack. Must target front row if possible.' },
  NAME = 'DERP'
  name = 'Derp'
  desc = 'Derp around doing nothing.'
  type = 'minor'
  cost = 0
  // Must encode general data object for all targeting schemes...
  targetRules = ['SELF'] // target1, target2.......
  // stage 0 { casterCond: , }
  canUse = function () { return true }

  unit = null
  // function (unit, validSlotArrayForItem)
  learnedBy = function (unit) {
    // unit.equip(this)
    if (this.unit === null) {
      unit.actions.push(this)
      this.unit = unit
    }
  }

  constructor (obj) {
    for (let propName in obj) {
      if (hasProp(this, propName)) {
        this[propName] = obj[propName]
      } else { alert('Missing prop', propName) }
    }
    this.targetRules = this.targetRules.map((str) => TargetRule.LIB[str])
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
for (let key in actionLib) {
  let NamedAction = actionLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  if (!Action.LIB[NamedAction.NAME]) { Action.LIB[NamedAction.NAME] = NamedAction }
}

export { Action }
