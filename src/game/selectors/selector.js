import CtrlState from './ctrlstates/CtrlState.js'
import onClicks from './onClicks/onClicks.js'

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
    // inspectUnit
    activeUnit = {}
    // skill = {}
    // (skill will have info about valid click targets and number of steps)
    // targets[i] = target clicked at step i
  }

  function getClickJSON (unit) {
      return {
        viewState: '',
        onClick: ''
      }
  }

  function toClickFcn (str) {
    return this.onClicks[str]
  }

  function getClickMode (unit) {
    let obj = this.getClickJSON(unit)
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
  changeState (NAME, obj = stateData) {
    CtrlState.LIB.NAME(this, obj)
  }

  constructor (gameObj = {}) {
    this.game = gameObj
  }
}

// selector = new Selector(gameObj)
// selector.changeState('CHOOSEUNIT')

export default Selector
