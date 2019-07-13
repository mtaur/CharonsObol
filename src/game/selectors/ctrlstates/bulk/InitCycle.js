import { CtrlState } from '../CtrlState.js'

// Nothing is selected.  No action in progress.
class InitCycle extends CtrlState {
  // static NAME = 'CHOOSEUNIT'
  // static name = 'ChooseUnit'
  static filename = 'InitCycle'
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

  tick (selector, playerTeam, cpuTeam) {
    if (playerTeam.hasTurn) { playerTeam.initTick() }
    if (cpuTeam.hasTurn) { cpuTeam.initTick() }
    if (playerTeam.turnPoints < playerTeam.maxTurnPoints && cpuTeam.turnPoints < cpuTeam.maxTurnPoints) {
      setTimeout(() => { this.tick(selector, playerTeam, cpuTeam) }, playerTeam.waitTime)
    } else {
      this.runTimers(selector)
    }
  }

  shouldRunClock (playerTeam, cpuTeam) {
    if (playerTeam.hasTurn && playerTeam.turnPoints >= playerTeam.maxTurnPoints) { return false }
    if (cpuTeam.hasTurn && cpuTeam.turnPoints >= cpuTeam.maxTurnPoints) { return false }
    if (playerTeam.hasTurn || cpuTeam.hasTurn) { return true }
    return false
  }

  runTimers (selector) {
    let playerTeam = selector.game.playerTeam
    let cpuTeam = selector.game.cpuTeam
    if (!playerTeam.hasTurn && !cpuTeam.hasTurn) {
      console.log('No turns possible!  Actions used and/or initTotal === 0')
      selector.changeState('RoundStart')
    } else if (this.shouldRunClock(playerTeam, cpuTeam)) {
    // } else if (playerTeam.turnPoints < playerTeam.maxTurnPoints && cpuTeam.turnPoints < cpuTeam.maxTurnPoints) {
      // playerTeam.initTick()
      // cpuTeam.initTick()
      this.tick(selector, playerTeam, cpuTeam)
      // setTimeout(() => { this.runTimers(selector) }, playerTeam.waitTime)
    // } else if (playerTeam.turnPoints - playerTeam.maxTurnPoints >= cpuTeam.turnPoints - cpuTeam.maxTurnPoints) {
    } else if (playerTeam.hasTurn && playerTeam.turnPoints >= playerTeam.maxTurnPoints) {
      console.log('Player turn...')
      playerTeam.turnPoints -= playerTeam.maxTurnPoints
      selector.changeState('ChooseUnit')
    } else if (cpuTeam.hasTurn && cpuTeam.turnPoints >= cpuTeam.maxTurnPoints) {
      console.log('cpu turn...', cpuTeam)
      console.log('front:', cpuTeam.front)
      console.log('back:', cpuTeam.back)
      // console.log('back:', cpuTeam.back)
      cpuTeam.turnPoints -= cpuTeam.maxTurnPoints
      selector.changeState('EnemyTurn')
    } else {
      console.log('Player has turns but CPU team turn gauge was full?')
      selector.changeState('RoundStart')
    }
  }

  constructor (selector, obj) {
    super(selector, obj)
    selector.turnState = 'idle'
    selector.getClickJSON = this.getClickJSON
    selector.resetData()
    this.runTimers(selector)
    // selector.game.playerTeam.initCycle()
    // selector.game.cpuTeam.initCycle()
    // selector.enemyTurn()
  }
}

export default InitCycle
