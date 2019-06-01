// import x from y.js
import { EffectRule } from '../../../objects/actions/effectRules/EffectRule.js'

var execute = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  let skill = selector.stateData.activeSkill
  let caster = selector.stateData.activeUnit
  skill.prevTargs.push(unit)
  skill.targetRules.shift()
  console.log('LIB:', EffectRule.LIB)
  console.log('Execute!')
  console.log('Skill:', skill)
  console.log('Caster:', caster)
  // console.log('Skill:', skill.name)
  // console.log('Targets:', skill.prevTargs)
  for (let index in skill.effects) {
    let effectObj = skill.effects[index]
    let effect = new EffectRule(effectObj, skill.prevTargs[index], caster)
    console.log(effect)
    effect.apply()
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
  }
  if (skill.cost > 0) { caster.baseStats.MP.current -= skill.cost }
  selector.stateData.activeUnit = {}
  selector.stateData.activeSkill = {}
  selector.stateData.inspectUnit = {}
  selector.stateData.skill = {}
  selector.changeState('ChooseUnit')
}

export default execute
