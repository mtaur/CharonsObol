import CtrlState from './ctrlstates/ctrlstates.js'

class selector {

  constructor (gameObj) {
    this.game = gameObj
  }

  // Which player, if any, is highlighted as active?
  activeUnit = []

  // What are we doing now
  ctrlState = {}

  // What happens if we click on a given unit
  // function chosen by state
  getClickMode (unit) {
  }

  changeState (NAME, ...params) {
    CtrlState.LIB.NAME(this, ...params)
  }

}

export default selector
