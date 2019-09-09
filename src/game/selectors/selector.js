import { CtrlState } from './ctrlstates/CtrlState.js'
import { onClicks } from './onClicks/onClicks.js'
import { classdir as ctrlStateLib } from './ctrlstates/jsload.js'
import { hasIn as hasProp } from 'lodash'
import { enemyTurn } from './enemyTurn.js'

class Selector {
  // game object
  game = {}
  // game.cpuTeam, game.playerTeam .....
  log = []
  logID = 0
  // click handler object, stored by name
  onClicks = onClicks
  turnState = 'idle'
  gameState = 'battle'
  roundNum = 0
  currentLogPage = 0
  showConsumables = false
  showStats = false
  showAbilities = true

  // Which player, if any, is highlighted as active?
  // activeUnit = {}
  // activeUnit = []

  // Use computed property to dectect activeUnit from getClickMode function?

  // What are we doing now
  ctrlState = {}
  // Targetting details?
  stateData = {
    inspectUnit: {},
    activeUnit: {},
    activeSkill: {}
    // skill = {}
    // (skill will have info about valid click targets and number of steps)
    // targets[i] = target clicked at step i
  }

  resetData () {
    this.stateData = {
      inspectUnit: {},
      activeUnit: {},
      activeSkill: {}
    }
  }

  resetSkill () {
    this.stateData.activeSkill = {}
    // this.activeSkill = {}
  }

  isSelected (unit) {
    // return unit && unit.id && this.stateData.activeUnit.id ? this.stateData.activeUnit.id === unit.id : false
    return hasProp(unit, 'id') && hasProp(this, 'stateData.activeUnit.id') ? this.stateData.activeUnit.id === unit.id : false
  }

  canTarget (unit) {
    // if (unit && unit.id && this.stateData.activeSkill && this.stateData.activeSkill.targetRules) {
    if (hasProp(unit, 'id') && hasProp(this, 'stateData.activeSkill.targetRules')) {
      let rule = new this.stateData.activeSkill.targetRules[0]({
        caster: this.stateData.activeUnit,
        playerTeam: this.stateData.activeUnit.playerTeam,
        cpuTeam: this.stateData.activeUnit.cpuTeam,
        prevTargs: this.stateData.activeSkill.prevTargs
      })
      // console.log('Rule:', rule)
      if (rule.canFind(unit)) { return true } else { return false }
    } else {
      // console.log('State data:', this.stateData)
      return false
    }
  }

  isPrevTarg (unit) {
    // if (unit && unit.id && this.stateData.activeSkill && this.stateData.activeSkill.prevTargs) {
    if (hasProp(unit, 'id') && hasProp(this, 'stateData.activeSkill.prevTargs')) {
      let prevTargs = this.stateData.activeSkill.prevTargs
      for (let key in prevTargs) {
        if (prevTargs[key].id === unit.id) { return true }
      }
    }
    return false
  }

  getClickJSON (selector, unit) {
    return {
      viewState: '',
      onClick: ''
    }
  }

  toClickFcn (str) {
    return this.onClicks[str]
  }

  getClickMode (unit) {
    let obj = this.getClickJSON(this, unit)
    return {
      // Keep as string, let Vue handle logic
      viewState: obj.viewState,
      // Convert to function
      onClick: this.toClickFcn(obj.onClick)
    }
  }

  // Tell Vue: give element this style state and this click handler.
  // Use simplified string IDs
  // getClickMode (unit) {
  //   return {
  //     // View layer will interpret this string(?) for each display instance
  //     // of the unit
  //     viewState: '',
  //     // onClick = onClicks[name] = function(selector, unit)
  //     // View layer will call this on click
  //     // Battlefield (center) receives this click handler only.
  //     onClick: () => {}
  //     // Method passed to Vue component:
  //     //
  //     // selector.onClicks[selector.getClickMode(unit).onClick](selector, unit)
  //   }
  // }

  // return actual function
  // getClickFcn (unit) {
  //   return this.onClicks[this.getClickMode(unit).onClick]
  // }

  // Try to make it so obj auto-fills the slot correctly here
  changeState (name, obj = this.stateData) {
    this.state = new CtrlState.LIB[name](this, obj)
    this.game.playerTeam.field.forEach(
      (unit) => {
        unit.actions.forEach((action) => {
          if (action.rebuild !== false) { action.rebuild(action, unit) }
        })
      })
    this.game.cpuTeam.field.forEach(
      (unit) => {
        unit.actions.forEach((action) => {
          if (action.rebuild !== false) { action.rebuild(action, unit) }
        })
      })
  }

  // get enemyTurn () { return enemyTurn.call(this) }
  enemyTurn () { enemyTurn.call(this) }

  constructor (gameObj = {}) {
    this.game = gameObj
    this.log = gameObj.log
  }
}

// Store classes, not instances.
// populate library using jsload from ./bulk
for (let key in ctrlStateLib) {
  let CtrlStateSubclass = ctrlStateLib[key]
  // console.log(key + ' is the current key')
  if (!CtrlState.LIB[key]) { CtrlState.LIB[key] = CtrlStateSubclass }
  // if (!CtrlState.LIB[CtrlStateSubclass.name]) { CtrlState.LIB[CtrlStateSubclass.name] = CtrlStateSubclass }
}

// selector = new Selector(gameObj)
// selector.changeState('CHOOSEUNIT')

export default Selector
