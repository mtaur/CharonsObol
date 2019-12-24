import { Status } from '../Status.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class DECAY {
  static NAME = 'DECAY'
  static filename = 'DECAY'

  constructor (effectObj = {}, target = {}, caster = {}) {
    // let amount = 0
    let virulence = 0.1
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
      if (amtAbs < 0) {
        let virl = tickSum / amtAbs
        // let virl = 0.1
        return { amount: amt, virulence: virl }
      } else return { amount: 0, virulence: 0.1 }
      // if (amtAbs > 0) {
      //   let virl = tickSum / amtAbs
      //   return { amount: Math.floor(amt), virulence: virl }
      // } else return { amount: 0, virulence: 0.04 }
    }

    let resetPoison = function (unit, trigger, data) {
      // let amount = data.amount
      // let amount = data.actualAmount
      // let preventAmount = data.actualAmount
      // let target = data.target
      // let caster = data.caster

      // target.baseStats.HP.current += preventAmount
      // apply -1 * amount as HEALTHOVERTIME...
      let poison = new Status.LIB.HEALTHOVERTIME(
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {},
          // flat: -1 * amount,
          flat: -1 * unit.baseStats.HP.current,
          virulence: this.virulence
        },
        unit, // target
        unit // caster
      )
      unit.statuses.push(poison)
      // unit.baseStats.HP.current = unit.baseStats.HP.current >= 0 ? unit.baseStats.HP.current : 0
      let newDat = merge(findCopies(unit))
      if (findCopies(unit).length > 1) {
        target.statuses = unit.statuses.filter((status) => status.NAME !== 'HEALTHOVERTIME')
        let mergeObj = {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {},
          flat: newDat.amount,
          virulence: newDat.virulence
        }
        target.statuses.push(new Status.LIB.HEALTHOVERTIME(mergeObj, unit, unit))
      }
      // unit.baseStats.HP.current = unit.baseStats.HP.current <= unit.baseStats.HP.max ? unit.baseStats.HP.current : unit.baseStats.HP.max
      // unit.checkAlive()
    }

    // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, data)
    // this.effects[effectIndx].update(unit, trigger, data)
    let getLogItem = function (unit, trigger, data) {
      // let summary = {}
      // summary.id = selector.logID
      let caster = unit // data.caster
      let target = unit // data.target
      // let thisObj = this
      // let oldData = data

      let newData = {
        type: 'decay',
        amount: unit.baseStats.HP.current,
        // preventAmount: data.actualAmount,
        caster: unit,
        target: unit
      }
      let log = [
        {
          text: `${newData.target.name} is decaying! ${newData.amount} poison will continue to tick down.`,
          type: 'decay',
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
      NAME: 'DECAY',
      name: 'decay',
      desc: 'Poison level resets to 100% max HP at start of each round if not already higher.',
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'DECAY',
          name: 'decay',
          trigger: ['ROUNDSTART'],
          // amount: amount,
          virulence: virulence,
          update: resetPoison,
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
  filename: 'DECAY',
  exprt: DECAY
}
export default obj
// export default Yolomace
