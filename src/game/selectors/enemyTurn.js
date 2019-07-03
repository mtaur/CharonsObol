// import { CtrlState } from '../CtrlState.js'
import { cloneDeep as clone } from 'lodash'
import { EffectRule } from '../objects/actions/effectRules/EffectRule.js'

// Nothing is selected.  No action in progress.
var enemyTurn = function () {
  // static filename = 'EnemyTurn'
  //
  let selector = this
  let cpuTeam = this.game.cpuTeam
  function choose (arr) {
    return arr[Math.floor(arr.length * Math.random())]
  }

  let execute = function (skill, caster) {
    for (let index in skill.effects) {
      let effectObj = skill.effects[index]
      let effect = new EffectRule(effectObj, skill.prevTargs[index], caster)
      console.log(effect)
      // unit.statuses.forEach((status) => { status.clearCheck(unit, 'BEFORETURN') })
      effect.apply()
      // unit.statuses.forEach((status) => status.clearCheck(unit, 'USETURN'))
      console.log(effect.NAME, 'effect.NAME')
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
    selector.stateData.activeUnit = {}
    selector.stateData.activeSkill = {}
    selector.stateData.inspectUnit = {}
    selector.stateData.skill = {}
    selector.changeState('ChooseUnit')
    console.log('log', selector.log)
  }

  let hasTurn = cpuTeam.field.filter((unit) => unit.baseStats.HP.current > 0 && (unit.hasAction.major || unit.hasAction.minor))
  if (hasTurn.length > 0) {
    let unit = choose(hasTurn)
    console.log('unit:', unit.name, unit)
    let canUse = unit.actions.filter((action) => action.canUse())
    console.log('canUse:', canUse)
    let skill = clone(choose(canUse))
    console.log('skill:', skill)
    skill.prevTargs = choose(skill.validPathArr())
    execute(skill, unit)
  }
}

export { enemyTurn }
