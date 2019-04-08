// import { Stat } from '../baseStats.js'
import { cloneDeep as clone } from 'lodash'

// Let's code the stat modifiers as a bunch of getters here.

class StatMods {
  static getBaseStatValues () {
    let baseStatValues = {}
    for (let key in this.baseStats) {
      baseStatValues[key] = this.baseStats[key].value
    }
    return baseStatValues
  }

  static getSoulStatValues () {
    let souls = this.souls
    let soulStatValues = clone(this.baseStatValues)
    for (let soulkey in souls) {
      let soul = souls[soulkey]
      for (let statkey in soul.bonus) {
        soulStatValues[statkey] += soul.bonus[statkey]
      }
    }
    return soulStatValues
  }

  static getConvertedStats () {
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }

  static getBonusStats () {
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }

  static getEffectiveStats () {
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }
}

export { StatMods }
