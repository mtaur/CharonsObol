// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function VOID (effectObj = {}, target = {}, caster = {}) {
  let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })

  let summarize = function () {
    let canHeal = target.baseStats.HP.max - target.baseStats.HP.current
    let amount = Math.ceil(canHeal / targetAllies.length)

    for (let index in targetAllies) {
      let ally = targetAllies[index]
      amount = Math.min(amount, ally.baseStats.HP.current)
    }

    let log = []

    for (let index in targetAllies) {
      let ally = targetAllies[index]
      let logItem = {
        text: `${target.name} damaged ${ally.name} for ${amount} HP!`,
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
    let healAmount = Math.min(canHeal, amount * targetAllies.length)
    let data = {
      type: 'void',
      // dred: dred,
      // dref: dref,
      amount: amount,
      healAmount: healAmount,
      caster: caster,
      target: target
    }
    log.push(
      {
        text: `${target.name} gained ${healAmount} HP.`,
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
      let allyData = {
        type: 'damage',
        dred: 0,
        dref: 0,
        amount: data.amount,
        // healAmount: healAmount,
        caster: caster,
        target: ally
      }

      let allyWasAlive = ally.live
      let allyDied = false

      ally.baseStats.HP.current -= data.amount
      ally.baseStats.HP.current = Math.floor(ally.baseStats.HP.current) // ally.baseStats.HP.current > 0 ? Math.floor(ally.baseStats.HP.current) : 0
      reverseForEach(ally.statuses, (status) => status.clearCheck(ally, 'TAKEDAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'DAMAGE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(ally.statuses, (status) => status.triggerCheckEffect(ally, 'TAKEDAMAGE', allyData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'DAMAGE', allyData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))

      // caster.checkAlive()
      ally.checkAlive()

      if (allyWasAlive && ally.live === false) {
        allyDied = true
      }

      if (allyDied) {
        reverseForEach(ally.statuses, (status) => status.clearCheck(target, 'DIE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
        reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'KILL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
        reverseForEach(ally.statuses, (status) => status.triggerCheckEffect(target, 'DIE', allyData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
        reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'KILL', allyData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      }
    })

    // caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    // caster.baseStats.HP.current -= data.dref
    target.baseStats.HP.current += data.healAmount
    target.baseStats.HP.current = Math.ceil(target.baseStats.HP.current) // target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
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
