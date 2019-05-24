import { Unit } from '../../units/Unit.js'
// import { Action } from '../Action.js'
import { cloneDeep as clone, hasIn as hasProp } from 'lodash'

class TargetRules {
  // pref = []
  // req = []
  // not = []
  // return function (unit, prevSteps = []) {}
  allies = []
  enemies = []
  caster = {}

  basics = {
    enemy: function (unit) {
      let retVal = false
      let (index in enemies) {
        if (enemies[index].id === unit.id) { retVal = true }
      }
      return retVal
    },
    ally: function (unit) {
      let retVal = false
      let (index in enemies) {
        if (enemies[index].id === unit.id) { retVal = true }
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
    }
  }

  constructor (obj = {
    caster: {},
    reqs: [],
    nots: [],
    prefs: [],
    playerTeam: [],
    cpuTeam: [],
    // Vast majority of skills use these, MUST overwrite as bool if not:
    live: true,
    dead: false,
    field: true,
    bench: false
  }) {
    // Update this object
    this.caster = obj.caster
    if (this.caster.side === Unit.SIDE.PLAYER) {
      this.caster.allies = obj.playerTeam
      this.caster.enemies = obj.cpuTeam
    } else if (this.caster.side === Unit.SIDE.CPU) {
      this.caster.allies = obj.cpuTeam
      this.caster.enemies = obj.playerTeam
    } else { alert('Unit passed to targeting rule has no valid side...') }

    // construct filter function
    let filterFcn = function (unit) {
      let all = playerTeam.all.concat(cpuTeam.all)
      if (obj.live) { obj.reqs.push(this.live) }
      if (obj.dead) { obj.reqs.push(this.dead) }
      if (obj.field) { obj.reqs.push(this.field) }
      if (obj.bench) { obj.reqs.push(this.bench) }

      for (let index in obj.reqs) {
        all = all.filter(reqs[index])
      }
      for (let index in obj.nots) {
        all = all.filter((item) => !nots[index](item))
      }
      let prefTargets = all
      for (let index in obj.prefs) {
        prefTargets = prefTargets.filter(prefs[index])
      }
      if (prefTargets.length > 0) {
        return prefTargets
      } else return all
    }
    this.filterFcn = filterFcn
  }
}

export { TargetRules }
