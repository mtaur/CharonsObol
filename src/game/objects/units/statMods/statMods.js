import { Stat } from '../Stat.js'
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
    // converts = [{ from: 'MELEE', to: 'RANGED', value: 0.5 }, {...}]
    let converts = clone(this.statConversions)
    let convertTo = {} // filter: convertTo.RANGED = [{ ..., to: 'RANGED', ... }, {...}]
    let bonusStatValues = clone(this.bonusStatValues)

    let convertedStatValues = clone(this.bonusStatValues) // = []
    // console.log('converts', converts)

    for (let statName in Stat.LIB) {
      // console.log('Setting up converts to', statName)
      convertTo[statName] = converts.filter(item => item.to === statName)
      // console.log('convertTo.', statName, '=', convertTo[statName])
      // console.log('Done:', convertTo[statName])
    }

    let weightSum = function (weights) {
      // let sum = values[key]
      // let weights = weights
      let sum = 0
      for (let weightIndex in weights) {
        // console.log('weights:', weights)
        let weight = weights[weightIndex]
        sum += weight.value * bonusStatValues[weight.from]
      }
      // console.log('sum:', sum)
      return sum
    }

    let alphaSum = function (alphaI, toStatName) {
      // let weights = convertTo[toStatName]
      let sum = bonusStatValues[toStatName] + alphaI * weightSum(convertTo[toStatName])
      return sum
    }

    let alpha = 1

    for (let toStatName in Stat.LIB) {
      if (alphaSum(alpha, toStatName) < 0) {
        // console.log(toStatName, 'was negative:', alphaSum(alpha, toStatName))
        alpha = -bonusStatValues[toStatName] / weightSum(convertTo[toStatName])
      }
      // let weights = convertTo[toStatName]
      // // convertedStatValues[toStatName] === this.bonusStatValues[toStatName]
      // convertedStatValues[toStatName] += weightSum(weights)
      // convertedStatValues[toStatName] = Math.floor(convertedStatValues[toStatName])
      // if (convertedStatValues[toStatName] < 0) {
      //   alpha = -this.bonusStatValues[toStatName] / weightSum(weights)
      //   convertedStatValues[toStatName] = this.bonusStatValues[toStatName] + alpha*weightSum(weights)
      // }
    }
    for (let toStatName in Stat.LIB) {
      convertedStatValues[toStatName] = Math.floor(alphaSum(alpha, toStatName))
    }

    // console.log('alpha:', alpha)
    return convertedStatValues
  }

  static getEffectiveStatValues () {
    // converts = [{ from: 'MELEE', to: 'RANGED', value: 0.5 }, {...}]
    let replacements = this.statReplacements
    let effectiveStatValues = clone(this.convertedStatValues)
    let replace = {}

    // console.log(replacements)

    for (let statName in Stat.LIB) {
      replace[statName] = replacements.filter(item => item.statName === statName)
      for (let index in replace[statName]) {
        let newVal = replace[statName][index].value(this)
        if (effectiveStatValues[statName] < newVal) {
          effectiveStatValues[statName] = Math.floor(newVal)
        }
      }
    }

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
      // console.log(item)
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
        // console.log(item.statBonus)
      } // else { console.log('No statBonus for', item) }
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
    }
    for (let status in statuses) {
      convertHolders.push(status)
    }
    // for (let soul in souls) {
    //   modHolders.push(soul.skills)
    // }

    for (let index in convertHolders) {
      let item = convertHolders[index]
      // console.log('Checking', item, 'for stat converts')
      if (hasProp(item, 'converts')) {
        item.converts.forEach(conversion => converts.push(conversion))
        // converts.push(item.converts)
        // console.log(item.converts)
      } // else { console.log('No statConverts for', item) }
    }

    return converts
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }

  static getStatReplacements () {
    let replacementHolders = []
    // filtered for mods
    let replacements = []

    // let souls = this.souls
    let items = this.items
    let statuses = this.statuses

    for (let index in items) {
      let item = items[index]
      replacementHolders.push(item)
    }
    for (let status in statuses) {
      replacementHolders.push(status)
    }
    // for (let soul in souls) {
    //   modHolders.push(soul.skills)
    // }

    for (let index in replacementHolders) {
      let item = replacementHolders[index]
      if (hasProp(item, 'replacements')) {
        // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
        item.replacements.forEach(replacement => replacements.push(replacement))
        // converts.push(item.converts)
        // console.log(item.converts)
      } // else { console.log('No statConverts for', item) }
    }

    return replacements
    // mods = []
    // fetch modifiers
    // sort modifiers
    // apply modifiers
  }
}

export { StatMods }
