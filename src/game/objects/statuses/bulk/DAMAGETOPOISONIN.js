import { Status } from '../Status.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class DAMAGETOPOISONIN {
  static NAME = 'DAMAGETOPOISONIN'
  static filename = 'DAMAGETOPOISONIN'

  constructor (effectObj = {}, target = {}, caster = {}) {
    // let amount = 0
    let virulence = 0.1
    if (hasProp(effectObj, 'virulence')) {
      this.effects[0].virulence = effectObj.virulence
    }

    // let converttopoison = function (unit, trigger, actionType, effect) {
    // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, data)
    // this.effects[effectIndx].update(unit, trigger, data)
    let converttopoison = function (unit, trigger, data) {
      let amount = data.amount
      let target = data.target
      let caster = data.caster

      target.baseStats.HP.current += amount
      // apply -1 * amount as HEALTHOVERTIME...
      let poison = new Status.LIB.HEALTHOVERTIME({ flat: -1 * amount, virulence: this.virulence }, target, caster)
      target.statuses.push(poison)
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
      // let oldData = data

      let newData = {
        type: 'damagetopoison',
        amount: data.amount,
        caster: data.caster,
        target: data.target
      }
      let log = [
        {
          text: `${newData.target.name} converted ${newData.amount} damage to poison.`,
          type: 'damagetopoison',
          amount: newData.amount,
          virulence: this.effects[0].virulence,
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
