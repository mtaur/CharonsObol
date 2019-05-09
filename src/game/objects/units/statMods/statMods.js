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
  static getBonusStatValues () {
    let bonuses = this.statBonuses
    let bonusStatValues = this.soulStatValues

    // mods = [{HP: 15, MELEE: 4, DRED: 1, DREF: 1}, {...}]

    for (let index in bonuses) {
      let bonus = bonuses[index]
      for (let statName in bonus) {
        if (hasProp(bonusStatValues, statName)) {
          bonusStatValues[statName] += bonus[statName]
        }
      }
    }

    return bonusStatValues
  }

  static getConvertedStatValues () {
    // converts = [{from: 'MELEE', to: 'RANGED', value: 0.5}, {...}]
    let converts = this.statConversions
    let convertTo = {}
    // convertTo.RANGED = [{ from: 'MELEE', value: 0.5}, {...}]
    // convertTo.MAGIC = [{ from: 'HP', value: .05}, {...}]
    // convertTo = { RANGED: [{ from: 'MELEE', value: 0.5}, {...}]
    //  MAGIC: [{ from: 'HP', value: .05}, {...}]
    // }

    let convertedStatValues = this.bonusStatValues // = []

    // Sort stat conversions by "to" field
    for (let index in converts) {
      let to = converts[index].to
      let partial = {
        from: converts[index].from
        value: converts[index].value
      }
      convertTo[to].push(partial)
    }

    let weightSum = function (weights) {
      // let sum = values[key]
      let sum = 0
      for (let weightIndex in weights) {
        let weight = weightIndex[weights]
        sum += weight[value]*this.bonusStatValues[weight.from]
      }
    }

    for (let toStatName in contertTo) {
      let alpha = 1
      let weights = convertTo[toStatName]
      // convertedStatValues[toStatName] === this.bonusStatValues[toStatName]
      convertedStatValues[toStatName] += weightSum(weights)
      convertedStatValues[toStatName] = Math.floor(convertedStatValues[toStatName])
      if (convertedStatValues[toStatName] < 0) {
        alpha = -this.bonusStatValues[toStatName] / weightSum(weights)
        convertedStatValues[toStatName] = this.bonusStatValues[toStatName] + alpha*weightSum(weights)
      }
    }

    return convertedStatValues
  }

  static getEffectiveStatValues () {
    let effectiveStatValues = this.convertedStatValues // = []
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

    for (let index in items) {
      let item = items[index]
      modHolders.push(item)
      console.log(item)
    }
    for (let status in statuses) {
      modHolders.push(status)
    }
    // for (let soul in souls) {
    //   modHolders.push(soul.skills)
    // }

    for (let index in modHolders) {
      let item = modHolders[index]
      if (hasProp(item, 'statBonus')) {
        mods.push(item.statBonus)
        console.log(item.statBonus)
      } else { console.log('No statBonus for', item) }
    }

    return mods
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }

  static getStatConversions () {
    let convertHolders = []
    // filtered for mods
    let converts = []

    // let souls = this.souls
    let items = this.items
    let statuses = this.statuses

    for (let index in items) {
      let item = items[index]
      convertHolders.push(item)
      console.log(item)
    }
    for (let status in statuses) {
      convertHolders.push(status)
    }
    // for (let soul in souls) {
    //   modHolders.push(soul.skills)
    // }

    for (let index in convertHolders) {
      let item = convertHolders[index]
      if (hasProp(item, 'statConvert')) {
        converts.push(item.statConverts)
        console.log(item.statConverts)
      } else { console.log('No statConverts for', item) }
    }

    return converts
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
