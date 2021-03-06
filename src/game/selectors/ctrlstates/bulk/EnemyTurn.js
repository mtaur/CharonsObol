import { CtrlState } from '../CtrlState.js'

// Nothing is selected.  No action in progress.
class EnemyTurn extends CtrlState {
  // static NAME = 'CHOOSEUNIT'
  // static name = 'ChooseUnit'
  static filename = 'EnemyTurn'
  //
  getClickJSON (selector, unit) {
    return {
      viewState: 'idle',
      onClick: 'inspect'
    }
    // if (selector.game.playerTeam.field.indexOf(unit) > -1) {
    //   return {
    //     viewState: 'idle',
    //     onClick: 'inspect'
    //   }
    // }
    // if (selector.game.cpuTeam.field.indexOf(unit) > -1) {
    //   return {
    //     viewState: 'idle',
    //     onClick: 'inspect'
    //   }
    // }
  }

  constructor (selector, obj) {
    super(selector, obj)
    selector.turnState = 'cpu'
    selector.getClickJSON = this.getClickJSON
    selector.prompt = 'Enemy is choosing an action...'
    selector.promptVerbose = 'Enemy is choosing an action. This might hurt...'
    selector.resetData()
    selector.enemyTurn()
  }
}

export default EnemyTurn
