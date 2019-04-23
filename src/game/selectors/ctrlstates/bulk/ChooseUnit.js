import { CtrlState } from '../ctrlstates.js'

// Nothing is selected.  No action in progress.
class ChooseUnit extends CtrlState {
  static NAME = 'CHOOSEUNIT'

  function getClickJSON (unit) {
    if (game.playerTeam.field.indexOf(unit) > -1) {
      return {
        viewState: '',
        onClick: 'makeActive'
      }
    }
    if (game.cpuTeam.field.indexOf(unit) > -1) {
      return {
        viewState: '',
        onClick: 'inspect'
      }
    }
  }

  constructor (selector, obj) {
    super(selector, obj)
    selector.getClickJSON = this.getClickJSON
  }


}

export default ChooseUnit
