import { Unit } from '../../units/Unit.js'
// import { Action } from '../Action.js'
import { classdir as ruleLib } from './jsload.js'
// import { cloneDeep as clone, hasIn as hasProp } from 'lodash'
import { hasIn as hasProp } from 'lodash'

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
  // rebuild = false // NATLOG needs to re-compute the number of targets each time
  caster = {}
  find = function () { return [] }
  // Is the given unit a valid target?
  canFind = function (unit) {
    let found = false
    this.find().forEach((validTarg) => {
      if (validTarg.id === unit.id) {
        found = true
      }
    })
    return found
  }

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
    behind: function (unit) {
      if (unit.pos === Unit.POS.FRONT) { return false }
      if (unit.allies.front.length > 0) { return true }
      // for (let index in unit.allies.field) {
      //   if (unit.allies.field[index].pos === Unit.POS.FRONT) { return true }
      // }
      return false
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
    fullhp: function (unit) {
      return unit.baseStats.HP.current >= unit.baseStats.HP.max
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
      for (let index in unit.statuses) {
        let status = unit.statuses[index]
        if (status.name === 'guard') {
          return true
        }
      }
      return false
      // return unit.statuses.indexOf('guard') > -1
    },
    hasSecondCover: function (unit) {
      if (unit.pos === Unit.POS.FRONT) { return false }
      for (let index in unit.statuses) {
        if (unit.statuses[index].name === 'guard') { return false }
      }
      for (let index in unit.allies.field) {
        let ally = unit.allies.field[index]
        for (let statIndex in ally.statuses) {
          if (ally.statuses[statIndex].name === 'guard') { return true }
        }
      }
      return false
    },
    // notguarding: function (unit) {
    //   for (let index in unit.statuses) {
    //     let status = unit.statuses[index]
    //     if (status.name === 'guard') {
    //       return false
    //     }
    //   }
    //   return true
    //   // return unit.statuses.indexOf('guard') > -1
    // },
    caster: function (unit) {
      return unit.id === this.caster.id
    },
    hasMajorAction: function (unit) {
      return unit.hasAction.major
    },
    hasMinorAction: function (unit) {
      return unit.hasAction.minor
    },
    different: function (unit) {
      let retVal = true
      for (let index in this.prevTargs) {
        if (unit.id === this.prevTargs[index].id) { retVal = false }
      }
      return retVal
    },
    frontfull: function (unit) {
      return (unit.allies.front.length >= 4 && unit.pos === Unit.POS.BACK)
    },
    backfull: function (unit) {
      return (unit.allies.back.length >= 4 && unit.pos === Unit.POS.FRONT)
    },
    enemyfrontfull: function (unit) {
      return (unit.enemies.front.length >= 4)
    },
    enemybackfull: function (unit) {
      return (unit.enemies.back.length >= 4)
    },
    otherrowfull: function (unit) {
      return (unit.pos === Unit.POS.FRONT ? unit.allies.back.length >= 4 : unit.allies.front.length >= 4)
    },
    enemyotherrowfull: function (unit) {
      return unit.pos === Unit.POS.FRONT ? unit.enemies.back.length >= 4 : unit.enemies.front.length >= 4
    },
    hasMana1: function (unit) {
      return unit.baseStats.MP.current > 0
    },
    fullmp: function (unit) {
      return unit.baseStats.MP.current >= unit.baseStats.MP.max
    },
    losinghp: function (unit) {
      for (let index in unit.statuses) {
        if (unit.statuses[index].NAME === 'HEALTHOVERTIME') {
          let poison = unit.statuses[index].effects[0]
          if (poison.amount < 0) {
            return true
          }
        }
      }
      return false
    }
  }

  static LIB = {}

  constructor (obj = {}) {
    for (let key in this.basics) {
      this.basics[key] = this.basics[key].bind(this)
    }
    let templ = {
      caster: {},
      reqs: [],
      nots: [],
      prefs: [],
      playerTeam: [],
      cpuTeam: [],
      prevTargs: [],
      prefNots: [],
      auto: false,
      // Vast majority of skills use these, MUST overwrite as bool if not:
      live: true,
      dead: false,
      field: true,
      bench: false
    }
    for (let key in templ) {
      this[key] = hasProp(obj, key) ? obj[key] : templ[key]
    }
    // Update this object
    // this.caster = obj.caster
    // this.prevTargs = obj.prevTargs
    // this.playerTeam = obj.playerTeam
    // this.cpuTeam = obj.cpuTeam
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
    // let prefNots = obj.prefNots ? obj.prefNots.map(byString) : []

    // construct array of valid targets
    let find = function () {
      // console.log('playerTeam', this.playerTeam)
      // console.log('cpuTeam', this.cpuTeam)
      let all = this.playerTeam.all.concat(this.cpuTeam.all)
      if (this.live === false) { nots.push(this.basics.live) }
      if (this.dead === false) { nots.push(this.basics.dead) }
      if (this.field === false) { nots.push(this.basics.field) }
      if (this.bench === false) { nots.push(this.basics.bench) }

      // console.log('reqs:', reqs)

      for (let index in reqs) {
        all = all.filter(reqs[index])
      }
      // console.log('Units remaining after reqs:', all)
      // console.log('nots', nots)
      for (let index in nots) {
        all = all.filter((item) => { return !(nots[index](item)) })
      }
      // console.log('Units remaining after nots:', all)
      let prefTargets = all
      for (let index in prefs) {
        prefTargets = prefTargets.filter(prefs[index])
      }
      // console.log('Units remaining after prefs:', prefTargets)
      if (prefTargets.length > 0) {
        return prefTargets
      } else return all
      // if (prefTargets.length > 0) {
      //   return prefTargets
      // } else {
      //   let prefTargets2 = all
      //   for (let index in prefNots) {
      //     prefTargets2 = prefTargets2.filter((unit) => !prefNots[index](unit))
      //   }
      //   if (prefTargets2.length > 0) { return prefTargets2 }
      //   return all
      // }
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
