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

  // Functions are "this" bound in the constructor
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
      for (let index in this.allies) {
        if (this.allies[index].id === unit.id) { retVal = true }
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
      for (let index in this.prevTargs) {
        if (unit.id === this.prevTargs[index].id) { retVal = false }
      }
      return retVal
    }
  }

  static LIB = {}

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
    for (let key in this.basics) {
      this.basics[key] = this.basics[key].bind(this)
    }
    // Update this object
    this.caster = obj.caster
    this.prevTargs = obj.prevTargs
    this.playerTeam = obj.playerTeam
    this.cpuTeam = obj.cpuTeam
    if (this.caster.side === Unit.SIDE.PLAYER) {
      this.allies = obj.playerTeam.all
      this.enemies = obj.cpuTeam.all
    } else if (this.caster.side === Unit.SIDE.CPU) {
      this.allies = obj.cpuTeam.all
      this.enemies = obj.playerTeam.all
    } else { alert('Unit passed to targeting rule has no valid side...') }

    let targRule = this

    let byString = function (input) {
      if (typeof input === 'string') { return targRule.basics[input] }
      if (typeof input === 'function') { return input }
      alert('TargetRule constructor received neither string nor function...')
      return () => { return true }
    }

    let reqs = obj.reqs.map(byString)
    let nots = obj.nots.map(byString)
    let prefs = obj.prefs.map(byString)

    // construct array of valid targets
    let find = function () {
      // console.log('playerTeam', this.playerTeam)
      // console.log('cpuTeam', this.cpuTeam)
      let all = this.playerTeam.all.concat(this.cpuTeam.all)
      if (obj.live === false) { nots.push(this.basics.live) }
      if (obj.dead === false) { nots.push(this.basics.dead) }
      if (obj.field === false) { nots.push(this.basics.field) }
      if (obj.bench === false) { nots.push(this.basics.bench) }

      // console.log('reqs:', reqs)

      for (let index in reqs) {
        all = all.filter(reqs[index])
      }
      console.log('Units remaining after reqs:', all)
      console.log('nots', nots)
      for (let index in nots) {
        all = all.filter((item) => { return !(nots[index](item)) })
      }
      console.log('Units remaining after nots:', all)
      let prefTargets = all
      for (let index in prefs) {
        prefTargets = prefTargets.filter(prefs[index])
      }
      console.log('Units remaining after prefs:', prefTargets)
      if (prefTargets.length > 0) {
        return prefTargets
      } else return all
      // console.log('Units remaining after prefs:', prefTargets)
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
