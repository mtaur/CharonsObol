// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'

function DAMAGE (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    // console.log('effectObj!!!!', effectObj)
    // summary = { data: ..., log: ... }
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

    let rawFloat = amount
    amount -= target.effectiveStatValues.DRED * effectObj.DREDScale
    amount = Math.floor(amount)
    amount = Math.max(amount, 0)
    let actualAmount = Math.min(amount, target.baseStats.HP.current)
    let dred = Math.floor(rawFloat) - amount
    let dref = Math.floor(effectObj.DREFScale * target.effectiveStatValues.DREF)
    let data = {
      type: 'damage',
      dred: dred,
      dref: dref,
      amount: amount,
      actualAmount: actualAmount, // ONLY recover this much health if convert-to-poison!
      caster: caster,
      target: target
    }
    let log = [
      {
        text: `${caster.name} damaged ${target.name} for ${amount} HP.`,
        type: 'damage',
        value: amount,
        actualAmount: actualAmount,
        caster: caster,
        target: target
      },
      {
        text: `${dred} damage was prevented by DRED.`,
        type: 'dred',
        value: dred,
        caster: caster,
        target: target
      },
      {
        text: `${dref} damage was reflected by DREF`,
        type: 'dref',
        value: dref,
        caster: caster,
        target: target
      }
    ]
    if (data.amount >= target.baseStats.HP.current && !target.statuses.some((status) => { return status.NAME === 'DAMAGETOPOISONIN' }) && !caster.statuses.some((status) => { return status.NAME === 'DAMAGETOPOISONOUT' })) {
      log.push({
        text: `${target.name} died...`,
        type: 'death',
        caster: target
      })
    }
    if (data.dref >= caster.baseStats.HP.current) {
      log.push({
        text: `${caster.name} died...`,
        type: 'death',
        caster: caster
      })
    }
    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let apply = function () {
    let summary = this.summarize()
    let data = summary.data
    target.baseStats.HP.current -= data.amount
    target.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0

    // caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    caster.baseStats.HP.current -= data.dref
    caster.baseStats.HP.current = caster.baseStats.HP.current > 0 ? Math.floor(caster.baseStats.HP.current) : 0

    let reverseForEach = (arr, fcn) => {
      for (let index = arr.length - 1; index >= 0; index--) {
        fcn(arr[index])
        index = Math.min(index, arr.length)
      }
    }
    reverseForEach(target.statuses, (status) => status.clearCheck(target, 'TAKEDAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'DAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    reverseForEach(target.statuses, (status) => status.triggerCheckEffect(target, 'TAKEDAMAGE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'DAMAGE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))

    target.checkAlive()
    caster.checkAlive()

    this.summary = summary
  }

  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'DAMAGE',
  exprt: DAMAGE
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
