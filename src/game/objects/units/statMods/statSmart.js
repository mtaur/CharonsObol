// import { Stat } from '../Stat.js'
// import { cloneDeep as clone } from 'lodash'
import { Action } from '../../actions/Action.js'
import { Soul } from 'src/game/objects/souls/Soul.js'
import { Status } from 'src/game/objects/statuses/Status.js'
import { Stat } from 'src/game/objects/units/Stat.js'
import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

class StatSmart {
  // Don't allow resources to exceed new max.
  // Gain resource increase to current value.
  static applyChange (changer) {
    let copy = clone(this)
    changer(copy)
    // console.log('Copy after change:', copy)

    let unit = this
    let baseStats = unit.baseStats

    for (let key in unit.convertedStatValues) {
      let oldStatVal = unit.convertedStatValues[key]
      let newStatVal = copy.convertedStatValues[key]
      let diff = newStatVal - oldStatVal
      if (baseStats[key].isResource) {
        if (diff > 0) {
          baseStats[key].current += diff
        }
        if (baseStats[key].current > newStatVal) {
          baseStats[key].current = newStatVal
        }
      }
    }

    changer(this)
  }

  static addSoul (soulStr) {
    function removeDuplicates (arr, propName = 'NAME') {
      // console.log(arr)
      // let PROPNAME = propName
      for (let i = arr.length - 1; i > -1; i--) {
        let str = arr[i][propName]
        for (let j = i - 1; j > -1; j--) {
          if (arr[j][propName] === str) {
            arr.splice(j, 1)
            i--
          }
        }
      }
    }

    function tryOn (unit) {
      if (unit.side === 'player' && unit.playerTeam.SP >= 15) {
        let soul = new Soul.LIB[soulStr]()
        unit.souls.push(soul)
        soul.skills.forEach((actionStr) => unit.actions.push(new Action.LIB[actionStr](unit)))
        // obj.templ.actions.forEach((actionStr) => unit.actions.push(new Action.LIB[actionStr](unit)))
        soul.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
        removeDuplicates(unit.actions)
        removeDuplicates(unit.statuses)
      }
    }

    this.applyChange(tryOn)
  }

  static purchaseScroll (scroll) {
    let NAME = scroll.NAME
    // console.log('this.SP', this.SP, 'scroll.cost', scroll.SPCost)
    if (this.SP >= scroll.SPCost) {
      this.inventory[NAME] = hasProp(this.inventory, NAME) ? this.inventory[NAME] + 1 : 1
      // unit.playerTeam.SP -= item.cost
    }
  }

  static equip (item) {
    function tryOn (unit) {
      // if (canEquip) { ... }
      // console.log('unit', unit)
      if (unit.allies.SP >= item.cost) {
        unit.items.push(item)
        item.unit = unit
        // unit.playerTeam.SP -= item.cost
      }
    }
    this.applyChange(tryOn)
    item.skills.forEach((actionStr) => { this.actions.push(new Action.LIB[actionStr](this)) })
    item.passives.forEach((passive) => { this.statuses.push(new Status.LIB[passive.NAME]()) })
    // obj.templ.passives.forEach((status) => unit.statuses.push(new Status.LIB[status.NAME]()))
    // unit.actions.push(new Action.LIB[actionStr](unit))
  }

  static levelUp (statName) {
    function raise (unit) {
      unit.baseStats[statName].increase()
    }
    // if (this.allies.SP >= this.baseStats[statName].cost) {
    if (this.availSP >= this.baseStats[statName].cost) {
      this.applyChange(raise)
    }

    // let stat = this.baseStats[statName]
    // if (this.playerTeam.SP >= stat.cost) {
    // console.log('REMOVED manual SP drain from unit.levelUp(statName)')
    //  this.playerTeam.SP -= stat.cost
    // this.applyChange(raise)
    // }
  }

  static unitJSON (unit) {
    // let template = {
    //   name: 'Jaqen',
    //   side: Unit.SIDE.CPU,
    //   pos: Unit.POS.FRONT,
    //   hero: false,
    //   live: true,
    //   // Configure stats with default setup.
    //   baseStats: Unit.defaultStats(),
    //   items: {},
    //   souls: [],
    //   actions: [],
    //   statuses: [],
    //   hasAction: { major: true, minor: true },
    //   SP: 0
    // }

    let json = {}
    json.id = unit.id
    json.name = unit.name
    json.side = unit.side
    json.pos = unit.pos
    json.hero = unit.hero
    json.live = unit.live
    json.baseStats = {}
    for (let statKey in unit.baseStats) {
      json.baseStats[statKey] = {}
      for (let propName in unit.baseStats[statKey]) {
        json.baseStats[statKey][propName] = unit.baseStats[statKey][propName]
      }
    }
    json.effectiveStatValues = {}
    for (let statKey in unit.effectiveStatValues) {
      json.effectiveStatValues[statKey] = unit.effectiveStatValues[statKey]
    }
    json.hasAction = { minor: unit.hasAction.minor, major: unit.hasAction.major }
    json.statuses = []
    unit.statuses.forEach((status, index) => { json.statuses[index] = { NAME: status.NAME, name: status.name } })
    json.souls = []
    unit.souls.forEach((soul, index) => { json.souls[index] = { NAME: soul.NAME, name: soul.name } })
    json.items = []
    unit.items.forEach((item, index) => { json.items[index] = { NAME: item.NAME, name: item.name } })
    // json.allies = unit.allies.cloneJSON
    // json.enemies = unit.enemies.cloneJSON

    return json
  }

  static teamJSON (team) {
    // side = '' // PLAYER or CPU
    // front = []
    // back = []
    // bench = []
    // dead = []
    // get field () { return this.front.concat(this.back) }
    // get all () { return this.front.concat(this.back).concat(this.bench).concat(this.dead) }
    // get live () { return this.front.concat(this.back).concat(this.bench) }

    let json = {}
    json.side = team.side
    json.front = []
    team.front.forEach((unit) => { json.front.push(unit.cloneJSON) })
    json.back = []
    team.back.forEach((unit) => { json.back.push(unit.cloneJSON) })
    json.bench = []
    team.bench.forEach((unit) => { json.bench.push(unit.cloneJSON) })
    json.dead = []
    team.dead.forEach((unit) => { json.dead.push(unit.cloneJSON) })
    json.field = json.front.concat(json.back)
    json.live = json.field.concat(json.bench)
    json.all = json.live.concat(json.dead)
    return json
  }

  static getAlphaSP () {
    // let team = this.allies
    let SPTot = 15
    let numSouls = this.souls.length
    // SPTot += this.souls.length * 15
    // Cost for each new soul is 10, 20, 30, 40...
    // SPTot += numSouls * (numSouls + 1) * 0.5 * 10
    SPTot += numSouls * (numSouls + 1) * 5
    this.items.forEach((item) => { SPTot += item.cost })
    // this.baseStats.forEach(
    for (let statName in this.baseStats) {
      let stat = this.baseStats[statName]
      let simulate = new Stat.LIB[statName]()
      for (let simCounters = simulate.counters; simCounters < stat.counters; simCounters++) {
        SPTot += simulate.cost
        simulate.increase()
      }
    }
    // SPTot = SPTot > this.freeSP ? SPTot - this.freeSP : 0
    return SPTot
  }

  static getBetaSP () {
    // let team = this.allies
    let SPTot = 15
    let numSouls = this.souls.length
    // SPTot += this.souls.length * 15
    // Cost for each new soul is 10, 20, 30, 40...
    // SPTot += numSouls * (numSouls + 1) * 0.5 * 10
    SPTot += numSouls * (numSouls + 1) * 5
    this.items.forEach((item) => { SPTot += item.cost })
    // this.baseStats.forEach(
    for (let statName in this.baseStats) {
      let stat = this.baseStats[statName]
      let simulate = new Stat.LIB[statName]()
      for (let simCounters = simulate.counters; simCounters < stat.counters; simCounters++) {
        SPTot += simulate.cost
        simulate.increase()
      }
    }
    SPTot = SPTot > this.freeSP ? SPTot - this.freeSP : 0
    return SPTot
  }

  static getAvailSP () {
    // let avail = 0
    let isZombie = false
    for (let index in this.statuses) {
      if (this.statuses[index].NAME === 'DECAY') {
        isZombie = true
      }
    }
    return isZombie ? this.freeSP - this.alphaSP + this.allies.SP : this.allies.SP
  }
}

export { StatSmart }
