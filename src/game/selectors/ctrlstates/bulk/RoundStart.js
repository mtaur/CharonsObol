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
    // selector.log.push({
    //   round: selector.roundNum,
    //   type: 'actionStart',
    //   text: `Start of Round ${selector.roundNum}`,
    //   caster: { name: 'system' },
    //   skill: { name: 'system' }
    // })
    selector.turnState = 'idle'
    selector.getClickJSON = this.getClickJSON
    selector.resetData()
    selector.game.playerTeam.initReset()
    selector.game.cpuTeam.initReset()
    selector.changeState('InitCycle')
    selector.showStats = false
    selector.showConsumables = false
    selector.showAbilities = true
    // selector.game.playerTeam.initTick()
    // selector.game.cpuTeam.initTick()
    // selector.enemyTurn()
  }
}

export default RoundStart
