// import { Stat } from '../Stat.js'
import { cloneDeep as clone } from 'lodash'
import { Action } from '../../actions/Action.js'
// import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

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

  static equip (item) {
    function tryOn (unit) {
      // if (canEquip) { ... }
      // console.log('unit', unit)
      unit.items.push(item)
      item.unit = unit
      if (unit.side === 'player') {
        unit.playerTeam.SP -= item.cost
      }
    }
    this.applyChange(tryOn)
    item.skills.forEach((actionStr) => { this.actions.push(new Action.LIB[actionStr](this)) })
    // unit.actions.push(new Action.LIB[actionStr](unit))
  }

  static levelUp (statName) {
    function raise (unit) {
      unit.baseStats[statName].increase()
    }
    let stat = this.baseStats[statName]

    if (this.playerTeam.SP >= stat.cost) {
      this.playerTeam.SP -= stat.cost
      this.applyChange(raise)
    }
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
}

export { StatSmart }
