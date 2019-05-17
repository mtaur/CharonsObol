// import { Soul } from '../souls/soul.js'
import { Stat } from './Stat.js'
import { StatMods } from './statMods/statMods.js'
import { ResourceManager } from './ResourceManager.js'

import { cloneDeep as clone, hasIn as hasProp } from 'lodash'
// function uniqClone (unit) {
//   let copy = clone(unit)
//   copy.id = Unit.id
//   return copy
// }

// Create Team objects
class Team {
  side = '' // PLAYER or CPU
  front = []
  back = []
  bench = []
  // dead...?

  get field () { return this.front.concat(this.back) }
  get all () { return this.front.concat(this.back).concate(this.bench) }

  reset () {
    this.front = []
    this.back = []
    this.bench = []
  }

  constructor (side) {
    this.side = side

    // Player spends SP between player units.
    if (side === Unit.SIDE.PLAYER) {
      this.SP = 100
    }

    // CPU units all receive CPU SP separately in full.
    if (side === Unit.SIDE.CPU) {
      this.SP = 50
    }
  }
}

class Unit {
  static SIDE = {
    PLAYER: 'player',
    CPU: 'cpu'
  }
  static POS = {
    FRONT: 'front',
    BACK: 'back',
    BENCH: 'bench'
  }

  static _id = -1

  static get id () {
    Unit._id++
    return Unit._id
  }

  raise = function (statName) {
    let stat = this.baseStats[statName]
    // if global SP > 0...
    if (this.playerTeam.SP >= stat.cost) {
      if (stat.isResource) {
        stat.current += stat.benefit
      }
      this.SP += stat.cost
      this.playerTeam.SP -= stat.cost

      let copy = clone(this)
      copy.baseStats[statName].increase()
      for (let key in this.baseStats) {
        let diff = copy.effectiveStatValues[key] - this.effectiveStatValues[key]
        if (this.baseStats[key].isResource) {
          console.log('key:', key, 'diff:', diff)
          if (diff > 0) {
            this.baseStats[key].current += diff
          }
          if (this.baseStats[key].current > copy.effectiveStatValues[key]) {
            this.baseStats[key].current = copy.effectiveStatValues[key]
          }
        }
      }
      stat.increase()
    }
  }

  // Define getters in an external file and bind them here.
  get baseStatValues () { return StatMods.getBaseStatValues.call(this) }
  get soulStatValues () { return StatMods.getSoulStatValues.call(this) }
  get bonusStatValues () { return StatMods.getBonusStatValues.call(this) }
  get convertedStatValues () { return StatMods.getConvertedStatValues.call(this) }
  get effectiveStatValues () { return StatMods.getEffectiveStatValues.call(this) }

  get statBonuses () { return StatMods.getStatBonuses.call(this) }
  get statConversions () { return StatMods.getStatConversions.call(this) }
  get statReplacements () { return StatMods.getStatReplacements.call(this) }

  get baseSummary () {
    let obj = this.baseStatValues
    obj.name = this.name
    obj.SP = this.SP
    obj.side = this.side
    obj.pos = this.pos
    obj.hero = this.hero
    obj.tooltip = 'This summay includes starting values and bonuses from invested SP only!'
    return obj
  }

  get soulSummary () {
    let obj = clone(this.soulStatValues)
    obj.name = this.name
    obj.SP = this.SP
    obj.side = this.side
    obj.pos = this.pos
    obj.hero = this.hero
    obj.tooltip = 'This summay includes soul bonuses!'
    return obj
  }

  // constructor helper function, must be called each time or else
  // stats shared globally
  static defaultStats = () => {
    let obj = {}
    for (let key in Stat.LIB) {
      // These are constructors which must be called
      // to create independent instances!
      obj[key] = Stat.LIB[key]()
    }
    return obj
  }

  constructor (
    gameObj = {
      playerTeam: new Team(Unit.SIDE.PLAYER),
      cpuTeam: new Team(Unit.SIDE.CPU)
    },
    // unit initialization object
    obj = {}
  ) {
    this.playerTeam = gameObj.playerTeam
    this.cpuTeam = gameObj.cpuTeam
    // !!!Must reset the template or else data will be shared!!!
    let template = {
      name: 'Jaqen',
      side: Unit.SIDE.CPU,
      pos: Unit.POS.FRONT,
      hero: false,
      // Configure stats with default setup.
      baseStats: Unit.defaultStats(),
      items: {},
      souls: [],
      SP: 0
    }
    for (let key in template) {
      // this[key] = obj[key] ? obj[key] : template[key]
      this[key] = hasProp(obj, key) ? obj[key] : template[key]
    }
    this.id = Unit.id
    this.resourceManager = new ResourceManager(this)
    // if (this.side === Unit.SIDE.PLAYER) {
    //   playerTeam.front.push(this)
    // } else { cpuTeam.front.push(this) }
  }
}
/// ^ end of class ^ ///
export { Unit, Team }
