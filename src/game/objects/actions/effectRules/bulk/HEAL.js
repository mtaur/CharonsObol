// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'

function HEAL (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let amount = 0
    if (hasProp(effectObj, 'poisonScale')) {
      let val = 0
      // console.log('Getter fired? This ===', this)
      for (let index in caster.statuses) {
        if (caster.statuses[index].NAME === 'HEALTHOVERTIME') {
          let poison = caster.statuses[index].effects[0]
          // console.log('Getter fired?', poison)
          // console.log(poison.amount)
          if (poison.amount < 0) {
            val -= effectObj.poisonScale * poison.amount
          }
        }
      }
      amount += val
    }
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
    if (hasProp(effectObj, 'flat')) {
      amount += effectObj.flat
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
    let summary = this.summarize()
    let data = summary.data
    target.baseStats.HP.current += data.amount
    target.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
    target.baseStats.HP.current = Math.min(target.baseStats.HP.current, target.baseStats.HP.max)

    let reverseForEach = (arr, fcn) => {
      for (let index = arr.length - 1; index >= 0; index--) {
        fcn(arr[index])
        index = Math.min(index, arr.length)
      }
    }
    reverseForEach(target.statuses, (status) => status.clearCheck(target, 'GETHEAL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'HEAL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    reverseForEach(target.statuses, (status) => status.triggerCheckEffect(target, 'GETHEAL', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'HEAL', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))

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
