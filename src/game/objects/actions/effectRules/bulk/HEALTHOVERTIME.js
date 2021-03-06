// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
import { Status } from '../../../statuses/Status.js'

function HEALTHOVERTIME (effectObj = {}, target = {}, caster = {}) {
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
      console.log('Regen val=', val, '?')
      amount += val
    }

    // let virulence = 0.04
    for (let statName in Stat.LIB) {
      // console.log('Looking for amount scaling:')
      if (hasProp(effectObj.scale, statName)) {
        // console.log('Found', statName)
        // console.log('effectObj:', effectObj)
        amount += caster.effectiveStatValues[statName] * effectObj.scale[statName]
        // console.log('Amount is now:', amount)
      }
    }
    // if (hasProp(effectObj, 'scale')) {
    //   for (let statName in effectObj.scale) {
    //     amount += caster.effectiveStatValues[statName].value * effectObj.scale[statName]
    //   }
    // }
    if (hasProp(effectObj, 'DREDScale')) {
      amount += target.effectiveStatValues['DRED'] * effectObj.DREDScale
    }
    if (hasProp(effectObj, 'flat')) {
      amount += effectObj.flat
    }

    let gainlose = amount >= 0 ? 'gaining' : 'losing'
    // let gainlose = effectObj.amount >= 0 ? 'gaining' : 'losing'
    let data = {
      type: 'healthovertime',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} is ${gainlose} health over time.`,
        type: 'healthovertime',
        // value: Math.floor(this.summary.reflected),
        caster: caster // ,
        // target: target
      }
    ]
    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let findCopies = function () {
    return target.statuses.filter((status) => status.NAME === 'HEALTHOVERTIME')
  }

  let merge = function (statuses) {
    let arr = []
    statuses.map((status) => {
      arr.push({
        amount: status.effects[0].amount,
        virulence: status.effects[0].virulence
      })
    })
    let amt = 0
    let amtAbs = 0
    let tickSum = 0
    arr.map((data) => {
      amt += data.amount
      amtAbs += Math.abs(data.amount)
      tickSum += data.virulence * Math.abs(data.amount)
    })
    if (amtAbs > 0) {
      let virulence = tickSum / amtAbs
      return { amount: Math.floor(amt), virulence: virulence }
    } else return { amount: 0, virulence: 0.04 }
  }

  let apply = function () {
    this.summary = this.summarize()
    target.statuses.push(new Status.LIB.HEALTHOVERTIME(effectObj, target, caster))
    let newDat = merge(findCopies())
    if (findCopies().length > 1) {
      target.statuses = target.statuses.filter((status) => status.NAME !== 'HEALTHOVERTIME')
      let mergeObj = {
        NAME: 'HEALTHOVERTIME',
        name: 'healthovertime',
        scale: {},
        flat: newDat.amount,
        virulence: newDat.virulence
      }
      target.statuses.push(new Status.LIB.HEALTHOVERTIME(mergeObj, target, caster))
    }
    // effectObj = new Action.LIB.VENOMSTRIKE.effects[1] ???
    // this.summary.text =
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} guarded.`,
    //     type: 'guard',
    //     // value: Math.floor(this.summary.reflected),
    //     caster: caster // ,
    //     // target: target
    //   }
    // ]
    // console.log(this.summary.text)
  }
  return { apply: apply, summarize: summarize }
  // return apply
}
var obj = {
  filename: 'HEALTHOVERTIME',
  exprt: HEALTHOVERTIME
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
