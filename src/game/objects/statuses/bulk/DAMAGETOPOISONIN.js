import { Status } from '../Status.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class DAMAGETOPOISONIN {
  static NAME = 'DAMAGETOPOISONIN'
  static filename = 'DAMAGETOPOISONIN'

  constructor (effectObj = {}, target = {}, caster = {}) {
    // let amount = 0
    let virulence = 0.05
    // this.effects[0].virulence = 0.1
    if (hasProp(effectObj, 'virulence')) {
      // this.effects[0].virulence = effectObj.virulence
      virulence = effectObj.virulence
    }

    let findCopies = function (unit) {
      return unit.statuses.filter((status) => status.NAME === 'HEALTHOVERTIME')
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
        let virl = tickSum / amtAbs
        return { amount: Math.floor(amt), virulence: virl }
      } else return { amount: 0, virulence: 0.04 }
    }

    let converttopoison = function (unit, trigger, data) {
      let amount = data.amount
      // let amount = data.actualAmount
      let preventAmount = data.actualAmount
      let target = data.target
      let caster = data.caster

      target.baseStats.HP.current += preventAmount
      // apply -1 * amount as HEALTHOVERTIME...
      let poison = new Status.LIB.HEALTHOVERTIME(
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {},
          flat: -1 * amount,
          virulence: this.virulence
        },
        target,
        caster
      )
      target.statuses.push(poison)
      // unit.baseStats.HP.current = unit.baseStats.HP.current >= 0 ? unit.baseStats.HP.current : 0
      let newDat = merge(findCopies(target))
      if (findCopies(target).length > 1) {
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
      // let thisObj = this
      // let oldData = data

      let newData = {
        type: 'damagetopoison',
        amount: data.amount,
        preventAmount: data.actualAmount,
        caster: data.caster,
        target: data.target
      }
      let log = [
        {
          text: `${newData.target.name} converted ${newData.amount} damage to poison.`,
          type: 'damagetopoison',
          amount: newData.amount,
          // virulence: this.effects[0].virulence,
          // virulence: thisObj.effects[0].virulence,
          virulence: virulence,
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
      NAME: 'DAMAGETOPOISONIN',
      name: 'damagetopoisonin',
      desc: 'Incoming damage converted to poison',
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'DAMAGETOPOISONIN',
          name: 'damagetopoisonin',
          trigger: ['TAKEDAMAGE'],
          // amount: amount,
          virulence: virulence,
          update: converttopoison,
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
  filename: 'DAMAGETOPOISONIN',
  exprt: DAMAGETOPOISONIN
}
export default obj
// export default Yolomace
