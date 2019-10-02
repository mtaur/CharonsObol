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
    // let benchmarks = [0, 0.25, 0.5, 0.75, 1, 9001]
    let benchmarks = [] // [0, 0.25, 0.5, 0.75, 1, 9001]
    for (let j = 0; j <= playerTeam.numBenchmarks + 1; j++) {
      benchmarks.push(j / playerTeam.numBenchmarks)
      // benchmarks.push(j)
    }
    let prog = () => { return Math.max(playerTeam.turnPoints / playerTeam.maxTurnPoints, cpuTeam.turnPoints / cpuTeam.maxTurnPoints) }
    // console.log('initial prog???', prog())
    let progIndex = 0
    benchmarks.forEach((item, index) => { if (prog() >= item) { progIndex = index } })
    // console.log('progIndex???', progIndex)
    let progress = prog()
    // console.log(typeof progIndex, 'type...')
    // console.log(progIndex + 1, 'progIndex + 1')
    while (progress < benchmarks[progIndex + 1] && progress < 1) {
      if (playerTeam.hasTurn) { playerTeam.initTick() }
      if (cpuTeam.hasTurn) { cpuTeam.initTick() }
      progress = prog()
      // console.log('Increased prog???', progress)
    }
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
    selector.prompt = 'Cycling the initiative bars...'
    selector.resetData()
    this.runTimers(selector)
    // selector.game.playerTeam.initCycle()
    // selector.game.cpuTeam.initCycle()
    // selector.enemyTurn()
  }
}

export default InitCycle
