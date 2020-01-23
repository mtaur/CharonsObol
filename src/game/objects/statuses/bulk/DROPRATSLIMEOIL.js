import { Status } from '../Status.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class DROPRATSLIMEOIL {
  static NAME = 'DROPRATSLIMEOIL'
  static filename = 'DROPRATSLIMEOIL'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let dropEssence = function (unit, trigger, data) {
      // let target = data.target
      // let caster = data.caster
      // let SP = target.betaSP
      // let scaleSP = 1
      // let essenceAmount = SP * scaleSP

      // let essenceData = {
      //   type: 'dropessence',
      //   essenceAmount: essenceAmount, // data.amount,
      //   // preventAmount: data.actualAmount,
      //   caster: data.caster,
      //   target: data.caster
      // }

      // caster.allies.RSP += essenceAmount
      // unit.playerTeam.RSP += essenceAmount
      if (!hasProp(unit.playerTeam.inventory, 'RATSLIMEOIL')) { unit.playerTeam.inventory.RATSLIMEOIL = 0 }
      unit.playerTeam.inventory.RATSLIMEOIL += 1 // essenceAmount
    }

    let getLogItem = function (unit, trigger, data) {
      let caster = data.caster
      let target = data.target
      // let SP = target.betaSP
      // let scaleSP = 1
      // let essenceAmount = SP * scaleSP

      let newData = {
        type: 'dropratslimeoil',
        dropAmount: 1,
        // essenceAmount: essenceAmount, // data.amount,
        // preventAmount: data.actualAmount,
        caster: data.caster,
        target: data.caster
      }

      let log = [
        {
          // text: `${newData.caster.name} healed self by ${healAmount}!  The darkness...`,
          // text: `${newData.target.name} yielded ${essenceAmount} essence!`,
          text: `${newData.target.name} dropped a Ratslime Oil!`,
          type: 'dropratslimeoil',
          amount: 1, // newData.essenceAmount,
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
      NAME: 'DROPRATSLIMEOIL',
      name: 'dropratslimeoil',
      desc: `Drops a ratslimeoil when killed.`,
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'DROPRATSLIMEOIL',
          name: 'dropratslimeoil',
          trigger: ['DIE'],
          // amount: amount,
          // virulence: ... ,
          // scaleDivided: 0.5,
          scaleSP: 1,
          scaleBase: 0,
          update: dropEssence,
          getLogItem: getLogItem
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
  filename: 'DROPRATSLIMEOIL',
  exprt: DROPRATSLIMEOIL
}
export default obj
// export default Yolomace
