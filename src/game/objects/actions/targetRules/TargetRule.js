import { Unit } from '../../units/Unit.js'
// import { Action } from '../Action.js'
import { classdir as ruleLib } from './jsload.js'
// import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

class TargetRule {
  // pref = []
  // req = []
  // not = []
  // return function (unit, prevSteps = []) {}
  allies = []
  enemies = []
  playerTeam = []
  cpuTeam = []
  prevTargs = []
  caster = {}
  find = function () { return [] }

  static LIB = {}

  basics = {
    enemy: function (unit) {
      let retVal = false
      for (let index in this.enemies) {
        if (this.enemies[index].id === unit.id) { retVal = true }
      }
      return retVal
    },
    ally: function (unit) {
      let retVal = false
      for (let index in this.enemies) {
        if (this.enemies[index].id === unit.id) { retVal = true }
      }
      return retVal
    },
    front: function (unit) {
      return unit.pos === Unit.POS.FRONT
    },
    back: function (unit) {
      return unit.pos === Unit.POS.BACK
    },
    field: function (unit) {
      return unit.pos === Unit.POS.BACK || unit.pos === Unit.POS.FRONT
    },
    bench: function (unit) {
      return unit.pos === Unit.POS.BENCH
    },
    live: function (unit) {
      return unit.live === true
    },
    dead: function (unit) {
      return unit.live === false
    },
    guarding: function (unit) {
      return unit.statuses.indexOf('guard') > -1
    },
    caster: function (unit) {
      return unit.id === this.caster.id
    },
    different: function (unit) {
      let retVal = true
      for (let index of this.prevTargs) {
        if (unit.id === this.prevTargs[index].id) { retVal = false }
      }
      return retVal
    }
  }

  byString = function (input) {
    if (typeof input === 'string') { return this.basics[input] }
    if (typeof input === 'function') { return input }
    alert('TargetRule constructor received neither string nor function...')
    return () => { return true }
  }

  constructor (obj = {
    caster: {},
    reqs: [],
    nots: [],
    prefs: [],
    playerTeam: [],
    cpuTeam: [],
    prevTargs: [],
    // Vast majority of skills use these, MUST overwrite as bool if not:
    live: true,
    dead: false,
    field: true,
    bench: false
  }) {
    // Update this object
    this.caster = obj.caster
    this.prevTargs = obj.prevTargs
    this.playerTeam = obj.playerTeam
    this.cpuTeam = obj.playerTeam
    if (this.caster.side === Unit.SIDE.PLAYER) {
      this.caster.allies = obj.playerTeam
      this.caster.enemies = obj.cpuTeam
    } else if (this.caster.side === Unit.SIDE.CPU) {
      this.caster.allies = obj.cpuTeam
      this.caster.enemies = obj.playerTeam
    } else { alert('Unit passed to targeting rule has no valid side...') }

    let reqs = obj.reqs.map(this.byString)
    let nots = obj.nots.map(this.byString)
    let prefs = obj.prefs.map(this.byString)

    // construct array of valid targets
    let find = function () {
      let all = this.playerTeam.all.concat(this.cpuTeam.all)
      if (!obj.live) { nots.push(this.live) }
      if (!obj.dead) { nots.push(this.dead) }
      if (!obj.field) { nots.push(this.field) }
      if (!obj.bench) { nots.push(this.bench) }

      for (let index in reqs) {
        all = all.filter(reqs[index])
      }
      for (let index in nots) {
        all = all.filter((item) => !nots[index](item))
      }
      let prefTargets = all
      for (let index in prefs) {
        prefTargets = prefTargets.filter(prefs[index])
      }
      if (prefTargets.length > 0) {
        return prefTargets
      } else return all
    }

    this.find = find
  }
}

// populate library using jsload from ./bulk
for (let key in ruleLib) {
  let NamedRule = ruleLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  if (!TargetRule.LIB[NamedRule.NAME]) { TargetRule.LIB[NamedRule.NAME] = NamedRule }
}

export { TargetRule }
