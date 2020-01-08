// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function VOID (effectObj = {}, target = {}, caster = {}) {
  let targetAllies = target.allies.filter((item) => { return item.id !== target.id })

  let summarize = function () {
    let canHeal = caster.baseStats.HP.max - caster.baseStats.HP.current
    let amount = canHeal * Math.ceil(1 / targetAllies.length)

    for (let index in targetAllies) {
      let ally = targetAllies[index]
      amount = Math.min(amount, ally.HP.current)
    }

    let log = []

    for (let index in targetAllies) {
      let ally = targetAllies[index]
      let logItem = {
        text: `${caster.name} damaged ${ally.name} for ${amount} HP.`,
        type: 'damage',
        // healAmount: healAmount,
        amount: amount,
        caster: caster,
        target: target
      }
      log.push(logItem)

      if (amount >= ally.baseStats.HP.current && !ally.statuses.some((status) => { return status.NAME === 'DAMAGETOPOISONIN' }) && !caster.statuses.some((status) => { return status.NAME === 'DAMAGETOPOISONOUT' })) {
        log.push({
          text: `${ally.name} died...`,
          type: 'death',
          caster: ally
        })
      }
    }

    // let dred = 0
    // let dref = 0
    let healAmount = Math.Min(canHeal, amount * targetAllies.length)
    let data = {
      type: 'void',
      // dred: dred,
      // dref: dref,
      amount: amount,
      caster: caster,
      target: target
    }
    log.push(
      {
        text: `${caster.name} gained ${healAmount} HP.`,
        type: 'heal',
        healAmount: healAmount,
        amount: amount,
        caster: caster,
        target: target
      }
    )

    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let apply = function () {
    let reverseForEach = (arr, fcn) => {
      for (let index = arr.length - 1; index >= 0; index--) {
        fcn(arr[index])
        index = Math.min(index, arr.length)
      }
    }

    let summary = this.summarize()
    let data = summary.data
    targetAllies.forEach((ally) => {
      ally.baseStats.HP.current -= data.amount
      ally.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(ally.baseStats.HP.current) : 0
      reverseForEach(ally.statuses, (status) => status.clearCheck(ally, 'TAKEDAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'DAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(ally.statuses, (status) => status.triggerCheckEffect(ally, 'TAKEDAMAGE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'DAMAGE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      ally.checkAlive()
    })

    // caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    // caster.baseStats.HP.current -= data.dref
    caster.baseStats.HP.current += data.healAmount
    caster.baseStats.HP.current = caster.baseStats.HP.current > 0 ? Math.floor(caster.baseStats.HP.current) : 0
    //
    // caster.checkAlive()

    this.summary = summary
  }

  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'VOID',
  exprt: VOID
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
