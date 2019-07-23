// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'

function DAMAGE (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    // summary = { data: ..., log: ... }
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

    let rawFloat = amount
    amount -= target.effectiveStatValues.DRED * effectObj.DREDScale
    amount = Math.floor(amount)
    amount = Math.max(amount, 0)
    let dred = Math.floor(rawFloat) - amount
    let dref = Math.floor(effectObj.DREFScale * target.effectiveStatValues.DREF)
    let data = {
      type: 'damage',
      dred: dred,
      dref: dref,
      amount: amount,
      caster: caster,
      target: target
    }
    let log = [
      {
        text: `${caster.name} damaged ${target.name} for ${amount} HP.`,
        type: 'damage',
        value: amount,
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
    if (data.amount >= target.HP) {
      log.push({
        text: `${target.name} died...`,
        type: 'death',
        caster: target
      })
    }
    if (data.dref >= caster.HP) {
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
    //   for (let statName in effectObj.scale.max) {
    //     let scaleVal = caster.effectiveStatValues[statName] * effectObj.scale.max[statName]
    //     if (scaleVal > maxScale) { maxScale = scaleVal }
    //   }
    //   amount += maxScale
    // }
    // amount -= target.effectiveStatValues.DRED * effectObj.DREDScale
    let summary = this.summarize()
    let data = summary.data
    target.baseStats.HP.current -= data.amount
    target.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0

    // caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    caster.baseStats.HP.current -= data.dref
    caster.baseStats.HP.current = caster.baseStats.HP.current > 0 ? Math.floor(caster.baseStats.HP.current) : 0

    target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
    caster.statuses.forEach((status) => status.clearCheck(caster, 'DAMAGE'))
    target.statuses.forEach((status) => status.triggerCheckEffect(target, 'TAKEDAMAGE', data))
    caster.statuses.forEach((status) => status.triggerCheckEffect(caster, 'DAMAGE', data))
    // triggerCheck = function (unit, trigger, action = {}, selector = {})

    target.checkAlive()
    caster.checkAlive()

    this.summary = summary
    // this.summary.amount = amount
    // this.summary.reduced = target.effectiveStatValues.DRED * effectObj.DREDScale
    // this.summary.reflected = effectObj.DREFScale * target.effectiveStatValues.DREF
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} damaged ${target.name} for ${Math.floor(amount)} HP.`,
    //     type: 'damage',
    //     value: amount,
    //     caster: caster,
    //     target: target
    //   },
    //   {
    //     text: `${Math.floor(this.summary.reduced)} damage was prevented by DRED.`,
    //     type: 'dred',
    //     value: Math.floor(this.summary.reduced),
    //     caster: caster,
    //     target: target
    //   },
    //   {
    //     text: `${Math.floor(this.summary.reflected)} damage was reflected by DREF`,
    //     type: 'dref',
    //     value: Math.floor(this.summary.reflected),
    //     caster: caster,
    //     target: target
    //   }
    // ]
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
