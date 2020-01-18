import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class DROPESSENCE {
  static NAME = 'DROPESSENCE'
  static filename = 'DROPESSENCE'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let dropEssence = function (unit, trigger, data) {
      let target = data.target
      // let caster = data.caster
      let SP = target.betaSP
      let scaleSP = 1
      let essenceAmount = SP * scaleSP

      // let essenceData = {
      //   type: 'dropessence',
      //   essenceAmount: essenceAmount, // data.amount,
      //   // preventAmount: data.actualAmount,
      //   caster: data.caster,
      //   target: data.caster
      // }

      // caster.allies.RSP += essenceAmount
      unit.playerTeam.RSP += essenceAmount
    }

    let getLogItem = function (unit, trigger, data) {
      let caster = data.caster
      let target = data.target
      let SP = target.betaSP
      let scaleSP = 1
      let essenceAmount = SP * scaleSP

      let newData = {
        type: 'dropessence',
        essenceAmount: essenceAmount, // data.amount,
        // preventAmount: data.actualAmount,
        caster: data.caster,
        target: data.caster
      }

      let log = [
        {
          // text: `${newData.caster.name} healed self by ${healAmount}!  The darkness...`,
          text: `${newData.target.name} yielded ${essenceAmount} essence!`,
          type: 'enmity',
          amount: newData.essenceAmount,
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
      NAME: 'DROPESSENCE',
      name: 'dropessence',
      desc: `Awards Essence when killed.`,
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'DROPESSENCE',
          name: 'dropessence',
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
  filename: 'DROPESSENCE',
  exprt: DROPESSENCE
}
export default obj
// export default Yolomace
