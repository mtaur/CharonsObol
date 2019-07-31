import { CtrlState } from '../CtrlState.js'

// Nothing is selected.  No action in progress.
class RoundStart extends CtrlState {
  // static NAME = 'CHOOSEUNIT'
  // static name = 'ChooseUnit'
  static filename = 'RoundStart'
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
    selector.roundNum++
    selector.currentLogPage = selector.roundNum
    selector.turnState = 'idle'
    selector.getClickJSON = this.getClickJSON
    selector.resetData()
    selector.game.playerTeam.initReset()
    selector.game.cpuTeam.initReset()
    selector.changeState('InitCycle')
    // selector.game.playerTeam.initTick()
    // selector.game.cpuTeam.initTick()
    // selector.enemyTurn()
  }
}

export default RoundStart
