import { CtrlState } from '../CtrlState.js'

// Nothing is selected.  No action in progress.
class ChooseUnit extends CtrlState {
  // static NAME = 'CHOOSEUNIT'
  // static name = 'ChooseUnit'
  static filename = 'ChooseUnit'
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
    selector.turnState = 'player'
    selector.promptVerbose = 'Your turn. No unit selected. Click an allied unit to begin choosing its action, or click its "dot-star" to automatically perform rest action.'
    selector.prompt = 'Your turn. No unit selected.'
    selector.resetData()
  }
}

export default ChooseUnit
