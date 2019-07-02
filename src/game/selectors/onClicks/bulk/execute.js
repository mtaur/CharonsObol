// import x from y.js
import { EffectRule } from '../../../objects/actions/effectRules/EffectRule.js'

var execute = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  selector.log.push(`${selector.stateData.activeUnit} used ${selector.stateData.activeSkill}.`)
  let skill = selector.stateData.activeSkill
  let caster = selector.stateData.activeUnit
  skill.prevTargs.push(unit)
  skill.targetRules.shift()
  // console.log('LIB:', EffectRule.LIB)
  // console.log('Execute!')
  // console.log('Skill:', skill)
  // console.log('Caster:', caster)
  // console.log('Skill:', skill.name)
  // console.log('Targets:', skill.prevTargs)
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
var obj = {
  filename: 'execute',
  exprt: execute
}
export default obj
// export default execute
