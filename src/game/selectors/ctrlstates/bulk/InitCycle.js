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
  }

  tick (selector, playerTeam, cpuTeam) {
    // let benchmarks = [0, 0.25, 0.5, 0.75, 1, 9001]
    let waiting = (team) => {
      // return team.turnPoints < team.maxTurnPoints || !team.hasTurn
      return team.turnPoints < team.maxTurnPoints && team.hasTurn
    }
    let ready = (team) => {
      return team.turnPoints >= team.maxTurnPoints && team.hasTurn
    }
    let needToRunClock = () => {
      return (waiting(playerTeam) || waiting(cpuTeam)) && (!ready(playerTeam) && !ready(cpuTeam))
    }
    let benchmarks = [] // [0, 0.25, 0.5, 0.75, 1, 9001]
    for (let j = 0; j <= playerTeam.numBenchmarks + 1; j++) {
      benchmarks.push(j / playerTeam.numBenchmarks)
    }
    let prog = () => {
      // return Math.max(playerTeam.turnPoints / playerTeam.maxTurnPoints, cpuTeam.turnPoints / cpuTeam.maxTurnPoints)
      let prog1 = 0
      let prog2 = 0
      if (playerTeam.hasTurn) { prog1 = playerTeam.turnPoints / playerTeam.maxTurnPoints }
      if (cpuTeam.hasTurn) { prog2 = cpuTeam.turnPoints / cpuTeam.maxTurnPoints }
      return Math.max(prog1, prog2)
    }
    let progIndex = 0
    benchmarks.forEach((item, index) => { if (prog() >= item) { progIndex = index } })
    let progress = prog()
    let tickPlayer = playerTeam.hasTurn
    let tickCPU = cpuTeam.hasTurn
    while (progress < benchmarks[progIndex + 1] && progress < 1) {
      if (tickPlayer) { playerTeam.initTick() }
      if (tickCPU) { cpuTeam.initTick() }
      // if (playerTeam.hasTurn) { playerTeam.initTick() }
      // if (cpuTeam.hasTurn) { cpuTeam.initTick() }
      progress = prog()
    }
    // if (playerTeam.turnPoints < playerTeam.maxTurnPoints && cpuTeam.turnPoints < cpuTeam.maxTurnPoints) {
    // Above logic fails if team has full turn gauge but no action points (due to Inspire or whatever)
    // if (waiting(playerTeam) || waiting(cpuTeam)) {
    if (needToRunClock()) {
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
      // console.log('No turns possible!  Actions used and/or initTotal === 0')
      selector.changeState('RoundStart')
    } else if (this.shouldRunClock(playerTeam, cpuTeam)) {
      this.tick(selector, playerTeam, cpuTeam)
    } else if (playerTeam.hasTurn && playerTeam.turnPoints >= playerTeam.maxTurnPoints) {
      // console.log('Player turn...')
      // playerTeam.turnPoints -= playerTeam.maxTurnPoints
      selector.changeState('ChooseUnit')
    } else if (cpuTeam.hasTurn && cpuTeam.turnPoints >= cpuTeam.maxTurnPoints) {
      // cpuTeam.turnPoints -= cpuTeam.maxTurnPoints
      selector.changeState('EnemyTurn')
    } else {
      // console.log('Player has turns but CPU team turn gauge was full?')
      selector.changeState('RoundStart')
    }
  }

  constructor (selector, obj) {
    super(selector, obj)
    selector.turnState = 'idle'
    selector.getClickJSON = this.getClickJSON
    selector.prompt = 'Cycling the initiative bars...'
    selector.promptVerbose = 'Cycling the initiative bars. Whose turn will it be next?'
    selector.resetData()
    this.runTimers(selector)
    // selector.game.playerTeam.initCycle()
    // selector.game.cpuTeam.initCycle()
    // selector.enemyTurn()
  }
}

export default InitCycle
