import { Status } from '../Status.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class HEALTHOVERTIME {
  static NAME = 'HEALTHOVERTIME'
  static filename = 'HEALTHOVERTIME'

  constructor (effectObj = {}, target = {}, caster = {}) {
    // compute amount from inputs, scaling, etc.
    // overwrite default values in the return values below if
    // necessary
    //
    // let flat = 0
    // let targ = target
    let amount = 0
    let virulence = 0.05
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
    amount = Math.floor(Math.abs(amount)) * (amount > 0 ? 1 : -1)

    if (hasProp(effectObj, 'virulence')) {
      virulence = effectObj.virulence
    }

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

    // let poisontick = function (unit, trigger, actionType, effect) {
    let poisontick = function (unit, trigger, action, effect) {
      // let effect = status.effects[0]
      let sign = effect.amount >= 0 ? 1 : -1
      let amt = Math.abs(effect.amount)
      let tick = amt * effect.virulence
      // tick *= actionType === 'minor' ? 1 : actionType === 'major' ? 2 : actionType === 'both' ? 3 : 0
      tick *= action.type === 'minor' ? 1 : action.type === 'major' ? 2 : action.type === 'both' ? 3 : 0
      tick = Math.ceil(tick)
      unit.baseStats.HP.current += tick * sign
      unit.baseStats.HP.current = unit.baseStats.HP.current >= 0 ? unit.baseStats.HP.current : 0
      unit.baseStats.HP.current = unit.baseStats.HP.current <= unit.baseStats.HP.max ? unit.baseStats.HP.current : unit.baseStats.HP.max

      let targetWasAlive = target.live
      let targetDied = false

      let reverseForEach = (arr, fcn) => {
        for (let index = arr.length - 1; index >= 0; index--) {
          fcn(arr[index])
          index = Math.min(index, arr.length)
        }
      }

      unit.checkAlive()
      if (targetWasAlive && target.live === false) {
        targetDied = true
      }

      if (targetDied) {
        let data = {
          type: 'tick',
          amount: amt,
          // actualAmount: actualAmount, // ONLY recover this much health if convert-to-poison!
          caster: caster,
          target: target
        }
        reverseForEach(target.statuses, (status) => status.clearCheck(target, 'DIE')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
        reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'KILL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
        reverseForEach(target.statuses, (status) => status.triggerCheckEffect(target, 'DIE', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
        reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'KILL', data)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      }

      effect.amount -= tick * sign
      console.log('Tick!', tick, 'Remaining amount:', effect.amount)
      console.log('Tick! Unit:', unit, 'Effect:', effect)
      // console.log('Amount:', effect.amount)
      if (effect.amount === 0) {
        unit.statuses = unit.statuses.filter((status) => status.NAME !== 'HEALTHOVERTIME')
      }
    }

    // let getLogItem = function (unit, trigger, actionType, status, selector) {
    let getLogItem = function (unit, trigger, action, status, selector, effectIndx = 0) {
      // let summary = {}
      // summary.id = selector.logID
      let effect = status.effects[0]

      let amt = Math.abs(effect.amount)
      let tick = Math.ceil(amt * effect.virulence)
      // tick *= actionType === 'minor' ? 1 : actionType === 'major' ? 2 : actionType === 'both' ? 3 : 0
      tick *= action.type === 'minor' ? 1 : action.type === 'major' ? 2 : action.type === 'both' ? 3 : 0
      tick = Math.ceil(tick)
      // let gainlose = tick >= 0 ? 'gained' : 'lost'
      let gainlose = amount >= 0 ? 'gained' : 'lost'
      let regentype = amount >= 0 ? 'regeneration' : 'poison'

      let data = {
        type: 'healthtick',
        amount: tick,
        target: unit
      }
      let log = [
        {
          text: `${unit.name} ${gainlose} ${tick} HP due to ${regentype}.`,
          type: 'damage',
          value: amount,
          caster: caster,
          target: target
        }
      ]
      if (tick >= target.baseStats.HP.current && gainlose === 'lost') {
        log.push({
          text: `${unit.name} died...`,
          type: 'death',
          caster: unit
        })
      }

      selector.logID++
      let summary = {
        data: data,
        log: log,
        id: selector.logID
      }
      return summary
    }

    return new Status({
      NAME: 'HEALTHOVERTIME',
      name: 'healthovertime',
      desc: 'Add positive or negative health amounts in increments.',
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          trigger: ['ENDTURN'],
          amount: amount,
          virulence: virulence,
          update: poisontick,
          getLogItem: getLogItem
          // scale: {
          //   MAGIC: 1
          // },
          // DREDScale: 1,
          // DREFScale: 1
        }
      ] // ,
      // bonus: [],
      // converts: [
      //   {
      //     from: 'DRED',
      //     to: 'DRED',
      //     value: 1
      //   }
      // ]
    })
  }
}
var obj = {
  filename: 'HEALTHOVERTIME',
  exprt: HEALTHOVERTIME
}
export default obj
// export default Yolomace
