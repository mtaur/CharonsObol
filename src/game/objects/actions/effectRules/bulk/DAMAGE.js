// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'

function DAMAGE (effectObj = {}, target = {}, caster = {}) {
  let apply = function () {
    let amount = 0
    for (let statName in Stat.LIB) {
      if (hasProp(effectObj.scale, statName)) {
        console.log('effectObj:', effectObj)
        amount += caster.effectiveStatValues[statName] * effectObj.scale[statName]
      }
    }
    if (hasProp(effectObj.scale, 'min')) {
      let minScale = 9001
      // for (let statName in Stat.LIB) {
      for (let statName in effectObj.scale.min) {
        let scaleVal = caster.effectiveStatValues[statName] * effectObj.scale.min[statName]
        if (scaleVal < minScale) { minScale = scaleVal }
      }
      amount += minScale
    }
    if (hasProp(effectObj.scale, 'max')) {
      let maxScale = 0
      // for (let statName in Stat.LIB) {
      for (let statName in effectObj.scale.max) {
        let scaleVal = caster.effectiveStatValues[statName] * effectObj.scale.max[statName]
        if (scaleVal > maxScale) { maxScale = scaleVal }
      }
      amount += maxScale
    }
    // console.log('target:', target)
    // console.log(target.effectiveStatValues)
    // console.log(target.baseStats.HP.current)
    // console.log(amount)
    amount -= target.effectiveStatValues.DRED * effectObj.DREDScale
    // console.log(amount)
    // amount = Math.max(0, Math.floor(amount))
    // let oldHPTarg = target.baseStats.HP.current
    // let oldHPCaster = caster.baseStats.HP.current
    target.baseStats.HP.current -= amount
    target.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
    caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    caster.baseStats.HP.current = caster.baseStats.HP.current > 0 ? Math.floor(caster.baseStats.HP.current) : 0
    target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    caster.statuses.forEach((status) => status.clearCheck(caster, 'DAMAGE'))
    // unit.statuses.forEach((status) => { status.clearCheck(unit, 'BEFORETURN') })
    // logging!
    this.summary = {}
    this.summary.amount = amount
    this.summary.reduced = target.effectiveStatValues.DRED * effectObj.DREDScale
    this.summary.reflected = effectObj.DREFScale * target.effectiveStatValues.DREF
    this.summary.text =
    // effectObj.summary = {}
    // effectObj.summary.amount = amount
    // effectObj.summary.reduced = target.effectiveStatValues.DRED * effectObj.DREDScale
    // effectObj.summary.reflected = effectObj.DREFScale * target.effectiveStatValues.DREF
    this.summary =
    [
      {
        text: `${caster.name} damaged ${target.name} for ${Math.floor(amount)} HP.`,
        type: 'damage',
        value: amount,
        caster: caster,
        target: target
      },
      {
        text: `${Math.floor(this.summary.reduced)} damage was prevented by DRED.`,
        type: 'dred',
        value: Math.floor(this.summary.reduced),
        caster: caster,
        target: target
      },
      {
        text: `${Math.floor(this.summary.reflected)} damage was reflected by DREF`,
        type: 'dref',
        value: Math.floor(this.summary.reflected),
        caster: caster,
        target: target
      }
    ]
    // console.log(this.summary.text)
    // console.log('this:::', this)
    // this.summary = effectObj.summary
  }
  return apply
}

var obj = {
  filename: 'DAMAGE',
  exprt: DAMAGE
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
