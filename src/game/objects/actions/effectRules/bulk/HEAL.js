// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'

function HEAL (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let amount = 0
    for (let statName in Stat.LIB) {
      if (hasProp(effectObj.scale, statName)) {
        console.log('effectObj:', effectObj)
        amount += caster.effectiveStatValues[statName] * effectObj.scale[statName]
      }
    }
    if (hasProp(effectObj.scale, 'min')) {
      let minScale = 9001
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
    amount = Math.floor(amount)

    let data = {
      type: 'heal',
      amount: amount,
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${caster.name} healed ${target.name} for ${amount} HP`,
        type: 'heal',
        amount: amount,
        caster: caster,
        target: target
      }
    ]
    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let apply = function () {
    // let amount = 0
    // for (let statName in Stat.LIB) {
    //   if (hasProp(effectObj.scale, statName)) {
    //     console.log('effectObj:', effectObj)
    //     amount += caster.effectiveStatValues[statName] * effectObj.scale[statName]
    //   }
    // }
    // if (hasProp(effectObj.scale, 'min')) {
    //   let minScale = 9001
    //   for (let statName in effectObj.scale.min) {
    //     let scaleVal = caster.effectiveStatValues[statName] * effectObj.scale.min[statName]
    //     if (scaleVal < minScale) { minScale = scaleVal }
    //   }
    //   amount += minScale
    // }
    // if (hasProp(effectObj.scale, 'max')) {
    //   let maxScale = 0
    //   // for (let statName in Stat.LIB) {
    //   for (let statName in effectObj.scale.max) {
    //     let scaleVal = caster.effectiveStatValues[statName] * effectObj.scale.max[statName]
    //     if (scaleVal > maxScale) { maxScale = scaleVal }
    //   }
    //   amount += maxScale
    // }

    // console.log('target:', target)
    // console.log(target.effectiveStatValues)
    // console.log(target.baseStats.HP.current)
    // console.log(amount)
    // amount -= target.effectiveStatValues.DRED * effectObj.DREDScale
    // console.log(amount)
    // amount = Math.max(0, Math.floor(amount))
    let summary = this.summarize()
    let data = summary.data
    target.baseStats.HP.current += data.amount
    target.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
    target.baseStats.HP.current = Math.min(target.baseStats.HP.current, target.baseStats.HP.max)
    // caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    // caster.baseStats.HP.current = caster.baseStats.HP.current > 0 ? Math.floor(caster.baseStats.HP.current) : 0
    // this.summary = {}
    // this.summary.amount = amount
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} healed ${target.name} for ${Math.floor(amount)} HP`,
    //     type: 'heal',
    //     value: Math.floor(amount),
    //     caster: caster,
    //     target: target
    //   }
    // ]
    // console.log(this.summary.text)
    this.summary = summary
  }
  return { apply: apply, summarize: summarize }
  // return apply
}

var obj = {
  filename: 'HEAL',
  exprt: HEAL
}
export default obj
// HEAL.NAME = 'HEAL'
//
// export default HEAL
