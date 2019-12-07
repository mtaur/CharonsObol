import { CtrlState } from '../CtrlState.js'

// Nothing is selected.  No action in progress.
class ManageTeam extends CtrlState {
  // static NAME = 'CHOOSEUNIT'
  // static name = 'ChooseUnit'
  static filename = 'ManageTeam'
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
    selector.promptVerbose = 'Manage your team. No unit selected.  In progress...'
    selector.prompt = 'Manage your team. No unit selected.'
    selector.resetData()
    selector.showStats = true
    selector.showConsumables = true
    selector.showAbilities = true
  }
}

export default ManageTeam
