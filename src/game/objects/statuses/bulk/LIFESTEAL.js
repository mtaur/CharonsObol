import { Status } from '../Status.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class LIFESTEAL {
  static NAME = 'LIFESTEAL'
  static filename = 'LIFESTEAL'

  constructor (effectObj = {}, target = {}, caster = {}) {
    // let amount = 0
    // let virulence = 0.1
    let lifestealfrac = 0.2
    if (hasProp(effectObj, 'lifestealfrac')) {
      // this.effects[0].virulence = effectObj.virulence
      lifestealfrac = effectObj.lifestealfrac
    }

    let steallife = function (unit, trigger, data) {
    // let converttopoison = function (unit, trigger, data) {
      let amount = data.amount
      // let target = data.target
      let caster = data.caster
      let gain = Math.floor(lifestealfrac * amount)
      gain = Math.min(gain, caster.baseStats.HP.max - caster.baseStats.HP.current)
      caster.baseStats.HP.current += gain

      let reverseForEach = (arr, fcn) => {
        for (let index = arr.length - 1; index >= 0; index--) {
          fcn(arr[index])
          index = Math.min(index, arr.length)
        }
      }
      let healData = {
        type: 'lifesteal',
        amount: gain, // data.amount,
        // preventAmount: data.actualAmount,
        caster: caster,
        target: caster
      }

      reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'GETHEAL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'HEAL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'GETHEAL', healData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'HEAL', healData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))

      caster.baseStats.HP.current += gain

      // let logItem = [
      //   {
      //     // text: `${newData.target.name} converted ${newData.amount} damage to poison.`,
      //     text: `${unit.name} gained ${gain} health from lifesteal effect!`,
      //     type: 'lifesteal',
      //     gain: gain,
      //     // amount: newData.amount,
      //     // virulence: this.effects[0].virulence,
      //     caster: caster,
      //     target: target
      //   }
      // ]
      // let selector = unit.playerTeam.getSelector()
      // // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, data).log
      // logItem.round = selector.roundNum
      // selector.logID++
      // logItem.id = selector.logID
      // selector.log.push(logItem)
      // console.log('logItem!!!!', logItem)
      // target.baseStats.HP.current += amount
      // apply -1 * amount as HEALTHOVERTIME...
      // let poison = new Status.LIB.HEALTHOVERTIME({ flat: -1 * amount, virulence: this.virulence }, target, caster)
      // let poison = new Status.LIB.HEALTHOVERTIME(
      //   {
      //     NAME: 'HEALTHOVERTIME',
      //     name: 'healthovertime',
      //     scale: {},
      //     flat: -1 * amount,
      //     virulence: this.virulence
      //   },
      //   target,
      //   caster
      // )
      // console.log(this)
      // let poison = new Status.LIB.HEALTHOVERTIME({ amount: -1 * amount, virulence: this.virulence }, target, caster)
      // target.statuses.push(poison)
      // target.statuses.push(new Status.LIB.HEALTHOVERTIME(effectObj, target, caster))
      // let newDat = merge(findCopies(target))
      // if (findCopies(target).length > 1) {
      //   target.statuses = target.statuses.filter((status) => status.NAME !== 'HEALTHOVERTIME')
      //   let mergeObj = {
      //     NAME: 'HEALTHOVERTIME',
      //     name: 'healthovertime',
      //     scale: {},
      //     flat: newDat.amount,
      //     virulence: newDat.virulence
      //   }
      //   target.statuses.push(new Status.LIB.HEALTHOVERTIME(mergeObj, target, caster))
      // }
      // unit.baseStats.HP.current = unit.baseStats.HP.current >= 0 ? unit.baseStats.HP.current : 0
      // unit.baseStats.HP.current = unit.baseStats.HP.current <= unit.baseStats.HP.max ? unit.baseStats.HP.current : unit.baseStats.HP.max
      // unit.checkAlive()
    }

    // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, data)
    // this.effects[effectIndx].update(unit, trigger, data)
    let getLogItem = function (unit, trigger, data) {
      // let summary = {}
      // summary.id = selector.logID
      let caster = data.caster
      let target = data.target
      let amount = data.amount
      // let oldData = data
      let gain = Math.floor(lifestealfrac * amount)
      gain = Math.min(gain, caster.baseStats.HP.max - caster.baseStats.HP.current)

      let newData = {
        type: 'lifesteal',
        // amount: data.amount,
        gain: gain,
        caster: data.caster,
        target: data.target
      }
      let log = [
        {
          // text: `${newData.target.name} converted ${newData.amount} damage to poison.`,
          text: `${newData.caster.name} gained ${newData.gain} health from lifesteal effect!`,
          type: 'lifesteal',
          gain: newData.gain,
          // amount: newData.amount,
          // virulence: this.effects[0].virulence,
          caster: caster,
          target: target
        }
      ]

      // selector.logID++
      let summary = {
        data: newData,
        log: log // ,
        // id: selector.logID
      }
      return summary
    }

    return new Status({
      NAME: 'LIFESTEAL',
      name: 'lifesteal',
      desc: lifestealfrac * 100 + `% of damage dealt by this unit is gained as HP.`,
      // desc: '20% of damage dealt by this unit is gained as HP.',
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'LIFESTEAL',
          name: 'lifesteal',
          trigger: ['DAMAGE'], // ['TAKEDAMAGE'] for DAMAGETOPOISONIN
          // amount: amount,
          // virulence: virulence,
          lifestealfrac: lifestealfrac,
          update: steallife,
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
  filename: 'LIFESTEAL',
  exprt: LIFESTEAL
}
export default obj
// export default Yolomace
