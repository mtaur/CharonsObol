// import { Soul } from '../souls/soul.js'
import { Stat } from './Stat.js'
import { Action } from '../actions/Action.js'
import { StatMods } from './statMods/statMods.js'
import { StatSmart } from './statMods/statSmart.js'
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
  dead = []
  // dead...?

  get field () { return this.front.concat(this.back) }
  get all () { return this.front.concat(this.back).concat(this.bench).concat(this.dead) }
  get live () { return this.front.concat(this.back).concat(this.bench) }

  get initTotal () {
    let total = 0
    for (let index in this.initArr) {
      total += this.initArr[index]
    }
    return total
  }
  // // let hasTurn = cpuTeam.field.filter((unit) => unit.baseStats.HP.current > 0 && (unit.hasAction.major || unit.hasAction.minor))
  // let hasTurn = cpuTeam.field.filter(canMove)
  get hasTurn () {
    let canMove = function (unit) {
      let retVal = false
      unit.actions.forEach((action) => { if (action.canUseTree()) { retVal = true } })
      return retVal
    }
    let retVal = false
    if (this.initTotal === 0) { return false }
    this.field.forEach((unit) => { if (canMove(unit)) { retVal = true } })
    // this.field.forEach((unit) => { if (unit.hasAction.major || unit.hasAction.minor) { retVal = true } })
    return retVal
  }
  maxTurnPoints = 100
  waitTime = 200 // 250
  initArr = []
  initReset () {
    // this.initVal = 0
    this.initArr = []
    this.field.forEach((unit) => {
      unit.hasAction.major = true
      unit.hasAction.minor = true
      for (let i = 0; i < 3; i++) {
        this.initArr.push(unit.effectiveStatValues.INIT)
      }
    })
    this.initArr.sort((a, b) => b - a)
  }
  turnPoints = 0
  initTick () {
    // console.log(this.turnPoints, this.side)
    this.turnPoints += this.initTotal
  }

  reset () {
    this.front = []
    this.back = []
    this.bench = []
    this.dead = []
  }

  inventory = {} // { SMOKEBOMB: 3, HEALTHPOT: 3, ... }

  get cloneJSON () { return StatSmart.teamJSON.call(this, this) }

  constructor (side) {
    this.side = side

    // Player spends SP between player units.
    if (side === Unit.SIDE.PLAYER) {
      // this.SP = 100
      this.SP = 60
    }

    // CPU units all receive CPU SP separately in full.
    if (side === Unit.SIDE.CPU) {
      this.SP = 90 // 100 // 120
      // this.SP = 100 // 50
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
    BENCH: 'bench',
    DEAD: 'dead'
  }

  static _id = 0 // -1

  static get id () {
    Unit._id++
    return Unit._id
  }

  raise = function (statName) {
    this.levelUp(statName)
    // let stat = this.baseStats[statName]
    // // if global SP > 0...
    // if (this.playerTeam.SP >= stat.cost) {
    //   if (stat.isResource) {
    //     stat.current += stat.benefit
    //   }
    //   this.SP += stat.cost
    //   this.playerTeam.SP -= stat.cost
    //
    //   let copy = clone(this)
    //   copy.baseStats[statName].increase()
    //   for (let key in this.baseStats) {
    //     let diff = copy.effectiveStatValues[key] - this.effectiveStatValues[key]
    //     if (this.baseStats[key].isResource) {
    //       console.log('key:', key, 'diff:', diff)
    //       if (diff > 0) {
    //         this.baseStats[key].current += diff
    //       }
    //       if (this.baseStats[key].current > copy.effectiveStatValues[key]) {
    //         this.baseStats[key].current = copy.effectiveStatValues[key]
    //       }
    //     }
    //   }
    //   stat.increase()
    // }
  }
  get allies () {
    if (this.side === Unit.SIDE.PLAYER) {
      return this.playerTeam
    } else return this.cpuTeam
  }
  get enemies () {
    if (this.side === Unit.SIDE.PLAYER) {
      return this.cpuTeam
    } else return this.playerTeam
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

  applyChange (...params) { StatSmart.applyChange.call(this, ...params) }
  //
  equip (...params) { StatSmart.equip.call(this, ...params) }
  levelUp (...params) { StatSmart.levelUp.call(this, ...params) }
  get cloneJSON () { return StatSmart.unitJSON.call(this, this) }

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

  checkAlive () {
    if (this.baseStats.HP.current <= 0 && this.pos !== Unit.POS.DEAD) {
      this.pos = Unit.POS.DEAD
      if (this.hasAction.minor) {
        this.allies.initArr.shift()
      }
      if (this.hasAction.major) {
        this.allies.initArr.shift()
        this.allies.initArr.shift()
      }
      this.allies.front = this.allies.front.filter((unit) => unit.id !== this.id)
      this.allies.back = this.allies.back.filter((unit) => unit.id !== this.id)
      this.allies.bench = this.allies.bench.filter((unit) => unit.id !== this.id)
      this.allies.dead.push(this)
      this.live = false
    }
  }

  constructor (
    gameObj = {
      playerTeam: new Team(Unit.SIDE.PLAYER),
      cpuTeam: new Team(Unit.SIDE.CPU)
    },
    // unit initialization object
    obj = {}
  ) {
    let thisUnit = this
    this.playerTeam = gameObj.playerTeam
    this.cpuTeam = gameObj.cpuTeam
    // !!!Must reset the template or else data will be shared!!!
    let template = {
      name: 'Jaqen',
      side: Unit.SIDE.CPU,
      pos: Unit.POS.FRONT,
      hero: false,
      live: true,
      // Configure stats with default setup.
      baseStats: Unit.defaultStats(),
      items: [],
      souls: [],
      actions: [
        new Action.LIB.MELEE(thisUnit),
        new Action.LIB.RANGED(thisUnit),
        new Action.LIB.MOVE(thisUnit),
        new Action.LIB.GUARD(thisUnit),
        new Action.LIB.RUN(thisUnit),
        new Action.LIB.SMOKEBOMB(thisUnit)
        // new Action.LIB.DERP(thisUnit)
        // { name: 'melee', type: 'major', desc: 'Basic malee attack. Must target front row if possible.' },
        // { name: 'ranged', type: 'major', desc: 'Basic ranged attack. Can target back row UNLESS a unit in the front row has GUARD activated.' },
        // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
        // { name: 'run', type: 'minor', desc: 'Run away!' }
      ],
      statuses: [],
      hasAction: { major: true, minor: true },
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
