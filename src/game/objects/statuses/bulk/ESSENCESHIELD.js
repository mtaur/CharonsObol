import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class ESSENCESHIELD {
  static NAME = 'ESSENCESHIELD'
  static filename = 'ESSENCESHIELD'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let essenceheal = function (unit, trigger, data) {
      let amount = data.amount
      let preventAmount = data.actualAmount
      let overkill = amount - preventAmount
      let target = data.target
      // let caster = data.caster
      let magScale = 0.5
      let wouldKill = overkill >= target.baseStats.HP.current // 0

      if (wouldKill) {
        let MP = target.baseStats.MP.current
        let MAGIC = target.effectiveStatValues.MAGIC
        let MPCost = MAGIC > 0 ? Math.ceil((overkill + 1) / (magScale * MAGIC)) : 0
        MPCost = Math.min(MPCost, MP)
        let healAmount = Math.ceil(MPCost * magScale * MAGIC)
        healAmount = Math.min(healAmount, target.baseStats.HP.max - target.baseStats.HP.current)

        target.baseStats.HP.current += healAmount
        target.baseStats.MP.current -= MPCost
      }
    }

    let getLogItem = function (unit, trigger, data) {
      let caster = data.caster
      let target = data.target
      let amount = data.amount
      let preventAmount = data.actualAmount
      let overkill = amount - preventAmount
      let magScale = 0.5
      let wouldKill = overkill >= target.baseStats.HP.current // 0

      // selector.logID++
      let summary = {
        data: {},
        log: [] // ,
        // id: selector.logID
      }

      if (wouldKill) {
        let MP = target.baseStats.MP.current
        let MAGIC = target.effectiveStatValues.MAGIC
        let MPCost = MAGIC > 0 ? Math.ceil((overkill + 1) / (magScale * MAGIC)) : 0
        MPCost = Math.min(MPCost, MP)
        let healAmount = Math.ceil(MPCost * magScale * MAGIC)
        healAmount = Math.min(healAmount, target.baseStats.HP.max - target.baseStats.HP.current)

        // target.baseStats.HP.current += healAmount
        let newData = {
          type: 'manabarrier',
          amount: data.amount,
          preventAmount: data.actualAmount,
          MPCost: MPCost,
          MAGIC: MAGIC,
          healAmount: healAmount,
          caster: data.caster,
          target: data.target
        }
        let log = [
          {
            text: `${newData.target.name} prevented ${newData.healAmount} damage with mana barrier.`,
            type: 'manabarrierheal',
            amount: newData.amount,
            MPCost: newData.MPCost,
            // virulence: this.effects[0].virulence,
            // virulence: thisObj.effects[0].virulence,
            // virulence: virulence,
            caster: caster,
            target: target
          },
          {
            text: `${newData.target.name} lost ${newData.MPCost} MP to the barrier.`,
            type: 'manabarriermana',
            amount: newData.amount,
            MPCost: MPCost,
            // virulence: this.effects[0].virulence,
            // virulence: thisObj.effects[0].virulence,
            // virulence: virulence,
            caster: caster,
            target: target
          }
        ]
        summary = {
          data: newData,
          log: log
        }
      }

      return summary
    }

    return new Status({
      NAME: 'ESSENCESHIELD',
      name: 'essenceshield',
      desc: 'Incoming fatal damage healed by 0.5x MAGIC for each 1 MP (up to current ' +
        'total or enough to prevent death)',
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'ESSENCESHIELD',
          name: 'essenceshield',
          trigger: ['TAKEDAMAGE'],
          // amount: amount,
          // virulence: virulence,
          update: essenceheal,
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
  filename: 'ESSENCESHIELD',
  exprt: ESSENCESHIELD
}
export default obj
// export default Yolomace
