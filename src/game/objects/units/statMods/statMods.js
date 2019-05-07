// import { Stat } from '../baseStats.js'
import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

// Let's code the stat modifiers as a bunch of getters here.

class StatMods {
  static getBaseStatValues () {
    let baseStatValues = {}
    for (let key in this.baseStats) {
      baseStatValues[key] = this.baseStats[key].value
    }
    return baseStatValues
  }

  // flat bonuses from souls
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

  // Apply flat bonuses from items
  static getBonusStats () {
    let bonuses = this.statBonuses
    let bonusStatValues = this.soulStatValues

    // mods = [{HP: 15, MELEE: 4, DRED: 1, DREF: 1}, {...}]

    for (let bonus in bonuses) {
      for (let statName in bonus) {
        if (hasProp(bonusStatValues, statName)) {
          bonusStatValues[statName] += bonus[statName]
        }
      }
    }

    return bonusStatValues
  }

  static getConvertedStats () {
    let convertedStatValues = []
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
    return convertedStatValues
  }

  static getEffectiveStats () {
    let effectiveStatValues = []
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
    return effectiveStatValues
  }

  static getStatBonuses () {
    // Collection of properties which may hold mods
    let modHolders = []
    // filtered for mods
    let mods = []

    // let souls = this.souls
    let items = this.items
    let statuses = this.statuses

    for (let item in items) {
      modHolders.push(item)
    }
    for (let status in statuses) {
      modHolders.push(status)
    }
    // for (let soul in souls) {
    //   modHolders.push(soul.skills)
    // }

    for (let item in modHolders) {
      if (hasProp(item, 'statBounus')) {
        mods.push(item.statBonus)
      }
    }

    return mods
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }

  static getStatConversions () {
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }

  static getStatReplacements () {
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }
}

export { StatMods }
