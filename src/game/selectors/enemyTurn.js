// import { CtrlState } from '../CtrlState.js'
import { cloneDeep as clone } from 'lodash'
import { EffectRule } from '../objects/actions/effectRules/EffectRule.js'

// Nothing is selected.  No action in progress.
var enemyTurn = function () {
  // static filename = 'EnemyTurn'
  //
  let selector = this
  let cpuTeam = this.game.cpuTeam
  let playerTeam = this.game.playerTeam
  function choose (arr) {
    return arr[Math.floor(arr.length * Math.random())]
  }
  let skill = {}
  let caster = {}

  let execute = function () {
    for (let index in skill.effects) {
      let effectObj = skill.effects[index]
      let effect = new EffectRule(effectObj, skill.prevTargs[index], caster)
      // console.log('skill.prevTargs[index]', skill.prevTargs[index])
      // console.log(effect)
      // unit.statuses.forEach((status) => { status.clearCheck(unit, 'BEFORETURN') })
      effect.apply()
      // unit.statuses.forEach((status) => status.clearCheck(unit, 'USETURN'))
      // console.log(effect.NAME, 'effect.NAME')
      // unit.statuses.forEach((status) => { status.clearCheck(unit, effect.NAME) })
      // this.summary = effectObj.summary
      effect.summary.log.forEach(
        (item) => {
          selector.logID++
          item.id = selector.logID
          selector.log.push(item)
        }
      )
    }
    if (skill.type === 'major' || skill.type === 'both') {
      caster.hasAction.major = false
    }
    if (skill.type === 'minor' || skill.type === 'both') {
      caster.hasAction.minor = false
    }
    for (let index in skill.after) {
      let after = new EffectRule(skill.after[index], {}, caster)
      after.apply()
      // unit.statuses.forEach((status) => { status.clearCheck(unit, after.NAME) })
      // unit.statuses.forEach((status) => { status.clearCheck(unit, 'USETURN') })
      after.summary.log.forEach(
        (item) => {
          selector.logID++
          item.id = selector.logID
          selector.log.push(item)
        }
      )
      // selector.log.push(after.summary)
    }
    if (skill.cost > 0) { caster.baseStats.MP.current -= skill.cost }
    if (skill.useInitPoints) {
      if (skill.type === 'minor') {
        caster.allies.initArr.shift()
      }
      if (skill.type === 'major') {
        caster.allies.initArr.shift()
        caster.allies.initArr.shift()
      }
      if (skill.type === 'both') {
        caster.allies.initArr.shift()
        caster.allies.initArr.shift()
        caster.allies.initArr.shift()
      }
    }
    caster.statuses.forEach((status) => status.triggerCheck(caster, 'ENDTURN', skill.type, selector))

    selector.stateData.activeUnit = {}
    selector.stateData.activeSkill = {}
    selector.stateData.inspectUnit = {}
    selector.stateData.skill = {}
    // selector.changeState('ChooseUnit')
    selector.changeState('InitCycle')
    // console.log('log', selector.log)
  }

  let unclone = function (unit) {
    let everyone = playerTeam.all.concat(cpuTeam.all)
    for (let index in everyone) {
      if (everyone[index].id === unit.id) return everyone[index]
    }
    alert('No match found for', unit)
  }

  let canMove = function (unit) {
    let retVal = false
    unit.actions.forEach((action) => { if (action.canUseTree()) { retVal = true } })
    return retVal
  }
  // let hasTurn = cpuTeam.field.filter((unit) => unit.baseStats.HP.current > 0 && (unit.hasAction.major || unit.hasAction.minor))
  let hasTurn = cpuTeam.field.filter(canMove)
  if (hasTurn.length > 0) {
    caster = choose(hasTurn)
    // console.log('unit:', caster.name, caster)
    let canUse = caster.actions.filter((action) => action.canUseTree())
    // console.log('canUse:', canUse)
    skill = clone(choose(canUse))
    // console.log('skill:', skill)
    skill.prevTargs = choose(skill.validPathArr())
    skill.prevTargs = skill.prevTargs.map(unclone)
    // console.log('skill.prevTargs', skill.prevTargs)
    skill.targRules = []
    selector.log.push({ text: `${caster.name} used ${skill.name}.` })
    execute()
  }
}

export { enemyTurn }
