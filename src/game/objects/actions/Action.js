import { classdir as actionLib } from './jsload.js'
// import { hasIn as hasProp, cloneDeep as clone } from 'lodash'
// import { cloneDeep as clone } from 'lodash'
import { hasIn as hasProp, cloneDeepWith as clone } from 'lodash'
import { TargetRule } from './targetRules/TargetRule.js'

// console.log(Soul)
class Action {
  // static NAME = 'BROCANTRIP'
  static LIB = {}

  // { name: 'melee', type: 'major', desc: 'Basic malee attack. Must target front row if possible.' },
  NAME = 'DERP'
  name = 'Derp'
  filename = 'Derp'
  desc = 'Derp around doing nothing.'
  type = 'minor'
  cost = 0
  after = []
  prereqs = []
  isConsumable = false
  SPCost = 0
  // Must encode general data object for all targeting schemes...
  targetRules = ['SELF'] // target1, target2.......
  // stage 0 { casterCond: , }
  prevTargs = []
  useInitPoints = true // Default behavior, rare exceptions like Inspire refund turns and Init chunks.
  useActionPoints = true // Default behavior, rare exceptions like FRENZY do not consume your action points.
  effects = [] // match effect to target by index
  rebuild = false // NATLOG needs to re-compute the number of targets each time
  canUse = function () {
    if (this.isConsumable === true && this.unit.playerTeam.inventory[this.NAME] <= 0) { return false }
    if (this.cost > this.unit.baseStats.MP.current) { return false }
    if (this.type === 'both' && !(this.unit.hasAction.major && this.unit.hasAction.minor)) { return false }
    if (this.type === 'major' && !this.unit.hasAction.major) { return false }
    if (this.type === 'minor' && !this.unit.hasAction.minor) { return false }

    // let retVal = true
    let obj = { playerTeam: this.unit.playerTeam, cpuTeam: this.unit.cpuTeam, caster: this.unit }
    return this.prereqs.every((prereq) => {
      let rule = new TargetRule.LIB[prereq](obj)
      return rule.canFind(this.unit)
      // if (rule.canFind(this.unit) === false) { retVal = false }
    })
    // this.prereqs.forEach((prereq) => {
    //   let rule = new TargetRule.LIB[prereq](obj)
    //   if (rule.canFind(this.unit) === false) { retVal = false }
    // })
    // return retVal
  }
  // old!!!
  // canUse = function () {
  //   let retVal = true
  //   let obj = { playerTeam: this.unit.playerTeam, cpuTeam: this.unit.cpuTeam, caster: this.unit }
  //   this.prereqs.forEach((prereq) => {
  //     let rule = new TargetRule.LIB[prereq](obj)
  //     if (rule.canFind(this.unit) === false) { retVal = false }
  //   })
  //   if (this.isConsumable === true && this.unit.playerTeam.inventory[this.NAME] <= 0) { retVal = false }
  //   if (this.cost > this.unit.baseStats.MP.current) { retVal = false }
  //   if (this.type === 'both' && !(this.unit.hasAction.major && this.unit.hasAction.minor)) { retVal = false }
  //   if (this.type === 'major' && !this.unit.hasAction.major) { retVal = false }
  //   if (this.type === 'minor' && !this.unit.hasAction.minor) { retVal = false }
  //   return retVal
  // }

  unit = null
  // function (unit, validSlotArrayForItem)
  learnedBy = function (unit) {
    // unit.equip(this)
    if (this.unit === null) {
      unit.actions.push(this)
      this.unit = unit
    }
  }

  // targSelect (prevTargs = []) {
  targSelect (selector, pendingAction = {}) {
    let rule = new this.targetRules[0]({
      caster: this.unit,
      playerTeam: this.unit.playerTeam,
      cpuTeam: this.unit.cpuTeam,
      prevTargs: pendingAction.prevTargs
    })
    console.log(rule)
    let prevTargs = pendingAction.prevTargs
    if (prevTargs.length > 0) {
      prevTargs.forEach((targ, index) => { console.log('Target', index, ':', targ.name) })
    }
    // rule.find().forEach((item, index) => {
    //   console.log(item.name + ' is a possible target of ' + this.name)
    //   // clone & repeat?
    //   if (this.targetRules.length > 1) {
    //     let next = clone(this)
    //     let currTargLog = clone(prevTargs)
    //     currTargLog.push(item)
    //     next.targetRules.shift()
    //     // next.targetRules[0].prevTargs = currTargLog
    //     next.targLog(currTargLog)
    //   }
    // })
  }

  betaCanUseTree = function () {
    if (!this.canUse()) { return false }
    return this.betaCanUseRecursion([])
    // return betaCanUseRecursion([], [])
    // let testPaths = []
    // this.betaCanUseRecursion([], testPaths)
    // if (validPaths.length > 0) {
    //   return true
    // }
    // return false
  }

  // betaCanUseRecursion = function (prevTargs = [], testPaths = []) {
  betaCanUseRecursion = function (prevTargs = []) {
    let rule = new this.targetRules[0]({
      caster: this.unit,
      playerTeam: this.unit.playerTeam,
      cpuTeam: this.unit.cpuTeam,
      prevTargs: prevTargs
    })
    // if (rule.find().length === 0) {
    //   console.log('No targets for', this.name)
    //   return false
    // }

    // rule.find().forEach((item, index) => {
    return rule.find().some((item, index) => {
      // console.log(item.name + ' is a possible target of ' + this.name)
      // clone & repeat?
      let currTargLog = clone(prevTargs, (prop) => { return typeof prop === 'function' ? undefined : prop })
      currTargLog.push(item)
      if (this.targetRules.length > 1) {
        let next = clone(this)
        next.targetRules.shift()
        // next.canUseRecursion(currTargLog, validPaths)
        return next.betaCanUseRecursion(currTargLog)
      } else if (this.targetRules.length === 1) {
        // validPaths.push(currTargLog)
        return true
      } else { return false }
    })
  }

  canUseTree = function () {
    // let start = performance.now()
    if (!this.canUse()) { return false }
    let validPaths = []
    this.canUseRecursion([], validPaths)
    // console.log(this.NAME, 'took', (performance.now() - start) * 0.001, 'seconds to calculate canUse().')
    if (validPaths.length > 0) {
      // console.log('Valid target paths:', validPaths)
      return true
    }
    // console.log('No targets for', this.name)
    return false
  }

  validPathArr = function () {
    if (!this.canUse()) { return false }
    let validPaths = []
    this.canUseRecursion([], validPaths)
    if (validPaths.length > 0) {
      // console.log('Valid target paths:', validPaths)
      // return true
      return validPaths
    }
    // console.log('No targets for', this.name)
    return false
  }

  canUseRecursion = function (prevTargs = [], validPaths = []) {
    let rule = new this.targetRules[0]({
      caster: this.unit,
      playerTeam: this.unit.playerTeam,
      cpuTeam: this.unit.cpuTeam,
      prevTargs: prevTargs
    })
    // if (rule.find().length === 0) {
    //   console.log('No targets for', this.name)
    //   return false
    // }
    rule.find().forEach((item, index) => {
      // console.log(item.name + ' is a possible target of ' + this.name)
      // clone & repeat?
      let currTargLog = clone(prevTargs, (prop) => { return typeof prop === 'function' ? undefined : prop })
      currTargLog.push(item)
      if (this.targetRules.length > 1) {
        let next = clone(this)
        next.targetRules.shift()
        next.canUseRecursion(currTargLog, validPaths)
      } else {
        validPaths.push(currTargLog)
      }
    })
  }

  targLog (prevTargs = []) {
    let rule = new this.targetRules[0]({
      caster: this.unit,
      playerTeam: this.unit.playerTeam,
      cpuTeam: this.unit.cpuTeam,
      prevTargs: prevTargs
    })
    if (prevTargs.length > 0) {
      prevTargs.forEach((targ, index) => { console.log(index, ':', targ.name) })
    }
    // console.log('rule.prevTargs:', rule.prevTargs)
    rule.find().forEach((item, index) => {
      // console.log(item.name + ' is a possible target of ' + this.name)
      // clone & repeat?
      if (this.targetRules.length > 1) {
        let next = clone(this)
        let currTargLog = clone(prevTargs, (prop) => { return typeof prop === 'function' ? undefined : prop })
        currTargLog.push(item)
        next.targetRules.shift()
        // next.targetRules[0].prevTargs = currTargLog
        next.targLog(currTargLog)
      }
    })
  }

  constructor (obj) {
    for (let propName in obj) {
      if (hasProp(this, propName)) {
        this[propName] = obj[propName]
      } else {
        alert('Action constructor: Missing prop', propName, 'obj:', obj)
        console.log('Action constructor: Missing prop', propName, 'obj:', obj)
      }
    }
    this.targetRules = this.targetRules.map((str) => TargetRule.LIB[str])
    // this.name = obj.name
    // this.statBonus = obj.statBonus
    // this.desc = obj.desc
    // this.equip = obj.equip
    // this.replacements = this.replacements
    // this.tier = obj.tier
    //
    // validate???
  }
}

// populate library using jsload from ./bulk
for (let key in actionLib) {
  let NamedAction = actionLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  // if (!Action.LIB[NamedAction.NAME]) { Action.LIB[NamedAction.NAME] = NamedAction }
  if (!Action.LIB[NamedAction.filename]) { Action.LIB[NamedAction.filename] = NamedAction }
}

export { Action }
