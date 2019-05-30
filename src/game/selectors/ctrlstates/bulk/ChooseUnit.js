import { CtrlState } from '../CtrlState.js'

// Nothing is selected.  No action in progress.
class ChooseUnit extends CtrlState {
  // static NAME = 'CHOOSEUNIT'
  // static name = 'ChooseUnit'
  //
  getClickJSON (selector, unit) {
    if (selector.game.playerTeam.field.indexOf(unit) > -1) {
      return {
        viewState: 'idle',
        onClick: 'makeActive'
      }
    }
    if (selector.game.cpuTeam.field.indexOf(unit) > -1) {
      return {
        viewState: 'idle',
        onClick: 'inspect'
      }
    }
  }

  constructor (selector, obj) {
    super(selector, obj)
    selector.getClickJSON = this.getClickJSON
    selector.resetData()
  }
}

export default ChooseUnit
