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

    // reverseForEach(target.statuses, (status) => status.clearCheck(target, 'TAKEDAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    // reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'DAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    // reverseForEach(target.statuses, (status) => status.triggerCheckEffect(target, 'TAKEDAMAGE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    // reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'DAMAGE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    // caster.statuses.forEach((status) => status.triggerCheck(caster, 'ENDTURN', skill, selector))

    let reverseForEach = (arr, fcn) => {
      for (let index = arr.length - 1; index >= 0; index--) {
        fcn(arr[index])
        index = Math.min(index, arr.length)
      }
    }

    selector.game.playerTeam.field.forEach((unit) => {
      reverseForEach(unit.statuses, (status) => status.clearCheck(unit, 'ROUNDSTART')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(unit.statuses, (status) => status.triggerCheckEffect(unit, 'ROUNDSTART')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    })
    selector.game.cpuTeam.field.forEach((unit) => {
      reverseForEach(unit.statuses, (status) => status.clearCheck(unit, 'ROUNDSTART')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(unit.statuses, (status) => status.triggerCheckEffect(unit, 'ROUNDSTART')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    })

    selector.changeState('InitCycle')
    selector.showStats = false
    selector.showConsumables = true
    selector.showAbilities = true
    // selector.game.playerTeam.initTick()
    // selector.game.cpuTeam.initTick()
    // selector.enemyTurn()
  }
}

export default RoundStart
