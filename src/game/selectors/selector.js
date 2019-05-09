import { CtrlState } from './ctrlstates/CtrlState.js'
import { onClicks } from './onClicks/onClicks.js'
import { classdir as ctrlStateLib } from './ctrlstates/jsload.js'

class Selector {
  // game object
  game = {}
  // click handler object, stored by name
  onClicks = onClicks

  // Which player, if any, is highlighted as active?
  // activeUnit = {}
  // activeUnit = []

  // Use computed property to dectect activeUnit from getClickMode function?

  // What are we doing now
  ctrlState = {}
  // Targetting details?
  stateData = {
    inspectUnit: {},
    activeUnit: {}
    // skill = {}
    // (skill will have info about valid click targets and number of steps)
    // targets[i] = target clicked at step i
  }

  isSelected (unit) {
    return unit && unit.id && this.stateData.activeUnit.id ? this.stateData.activeUnit.id === unit.id : false
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
  }

  constructor (gameObj = {}) {
    this.game = gameObj
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
