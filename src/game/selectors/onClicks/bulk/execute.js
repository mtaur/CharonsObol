// import x from y.js
import { EffectRule } from '../../../objects/actions/effectRules/EffectRule.js'

var execute = function (selector, unit) {
  let skill = selector.stateData.activeSkill
  let caster = selector.stateData.activeUnit
  // let cpuTeam = selector.game.cpuTeam
  let playerTeam = selector.game.playerTeam
  selector.log.push(
    {
      text: `${selector.stateData.activeUnit.name} used ${selector.stateData.activeSkill.name}.`,
      type: 'actionStart',
      round: selector.roundNum,
      caster: caster,
      skill: skill
    })

  skill.prevTargs.push(unit)
  skill.targetRules.shift()

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
        item.round = selector.roundNum
        selector.logID++
        item.id = selector.logID
        selector.log.push(item)
      }
    )
  }
  // if (skill.useActionPoints === true) {
  if (skill.useActionPoints) {
    if (skill.type === 'major' || skill.type === 'both') {
      caster.hasAction.major = false
    }
    if (skill.type === 'minor' || skill.type === 'both') {
      caster.hasAction.minor = false
    }
  }
  for (let index in skill.after) {
    let after = new EffectRule(skill.after[index], {}, caster)
    after.apply()
    // unit.statuses.forEach((status) => { status.clearCheck(unit, after.NAME) })
    // unit.statuses.forEach((status) => { status.clearCheck(unit, 'USETURN') })
    after.summary.log.forEach(
      (item) => {
        item.round = selector.roundNum
        selector.logID++
        item.id = selector.logID
        selector.log.push(item)
      }
    )
    // selector.log.push(after.summary)
  }
  if (skill.cost > 0) { caster.baseStats.MP.current -= skill.cost }
  if (skill.essenceCostScale !== 0) { caster.essence -= skill.essenceCostScale * caster.betaSP }
  if (skill.useInitPoints) {
    if (skill.type === 'minor') {
      selector.stateData.activeUnit.allies.initArr.shift()
      playerTeam.turnPoints -= Math.floor(playerTeam.maxTurnPoints * 0.35)
    }
    if (skill.type === 'major') {
      selector.stateData.activeUnit.allies.initArr.shift()
      selector.stateData.activeUnit.allies.initArr.shift()
      playerTeam.turnPoints -= Math.floor(playerTeam.maxTurnPoints * 0.65)
    }
    if (skill.type === 'both') {
      selector.stateData.activeUnit.allies.initArr.shift()
      selector.stateData.activeUnit.allies.initArr.shift()
      selector.stateData.activeUnit.allies.initArr.shift()
      playerTeam.turnPoints -= playerTeam.maxTurnPoints
    }
  }
  if (skill.isConsumable) {
    selector.game.playerTeam.inventory[skill.NAME]--
  }
  caster.statuses.forEach((status) => status.triggerCheck(caster, 'ENDTURN', skill, selector))

  selector.stateData.activeUnit = {}
  selector.stateData.activeSkill = {}
  selector.stateData.inspectUnit = {}
  selector.stateData.skill = {}
  // selector.changeState('ChooseUnit')
  console.log('log', selector.log)
  selector.changeState('InitCycle')
}
var obj = {
  filename: 'execute',
  exprt: execute
}
export default obj
// export default execute
