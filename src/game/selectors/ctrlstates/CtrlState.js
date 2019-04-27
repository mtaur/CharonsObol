// import { Stat } from '../units/baseStats.js'
import { classdir as ctrlStateLib } from './jsload.js'

class CtrlState {

  static LIB = {}

  // static validateObj (obj) {
  //   // Soul with no bonuses is ok, nothing to check
  //   if (!obj.bonus) { return true }
  //   // ...otherwise, validate all stat gains.
  //   for (let key in obj.bonus) {
  //     if (!Stat.LIB[key]) {
  //       throw new Error('bad stat name' + key + '!')
  //       // return false???
  //     }
  //   }
  //   return true
  // }

  // function getClickJSON (unit) {
  //     return {
  //       viewState: '',
  //       onClick: ''
  //     }
  // }
  //
  // function toClickFcn (str) {
  //   return this.selector.onClicks[str]
  // }
  //
  // function getClickMode (unit) {
  //   let obj = this.getClickJSON(unit)
  //   return {
  //     // Keep as string, let Vue handle logic
  //     viewState: obj.viewState,
  //     // Convert to function
  //     onClick: this.toClickFcn(obj.onClick)
  //   }
  // }

  constructor (selector, obj) {
    this.selector = selector
    this.obj = obj
    // this.toClickFcn = (str) => selector.onClicks[str]
    // return this
  }
}

// Store classes, not instances.
// populate library using jsload from ./bulk
for (let key in ctrlStateLib) {
  let CtrlState = ctrlStateLib[key]
  if (!CtrlState.LIB[CtrlState.NAME]) { CtrlState.LIB[CtrlState.NAME] = CtrlState }
}

// Instantiate class to change state of selector object.
// Apply state to selector object by calling:
//
// CtrlState.LIB.NAME(selector, params)

export { CtrlState }
