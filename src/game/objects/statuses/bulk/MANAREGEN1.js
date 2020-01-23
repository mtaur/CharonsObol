import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class MANAREGEN1 {
  static NAME = 'MANAREGEN1'
  static filename = 'MANAREGEN1'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let manaRegen = function (unit, trigger, data) {
      if (unit.baseStats.MP.current < unit.baseStats.MP.max) {
        unit.baseStats.MP.current += 1
      }
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
        type: 'mpregen1',
        amount: 1,
        // preventAmount: data.actualAmount,
        caster: unit,
        target: unit
      }
      let log = [
        {
          text: `${newData.target.name} regenerates ${newData.amount} MP.`,
          type: 'mpregen1',
          amount: newData.amount,
          // virulence: this.effects[0].virulence,
          // virulence: thisObj.effects[0].virulence,
          // virulence: virulence,
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
      NAME: 'MANAREGEN1',
      name: 'manaregen1',
      desc: 'Regenerate 1 MP per turn..',
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'MANAREGEN1',
          name: 'manaregen1',
          trigger: ['ROUNDSTART'],
          amount: 1,
          // virulence: virulence,
          update: manaRegen,
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
  filename: 'MANAREGEN1',
  exprt: MANAREGEN1
}
export default obj
// export default Yolomace
