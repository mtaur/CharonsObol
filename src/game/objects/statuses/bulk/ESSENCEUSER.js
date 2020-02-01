import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class ESSENCEUSER {
  static NAME = 'ESSENCEUSER'
  static filename = 'ESSENCEUSER'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let initEssence = function (unit, trigger, data) {
      // let target = data.target
      // let caster = data.caster
      let SP = unit.betaSP
      let scaleSP = 0.25
      let essenceAmount = Math.ceil(SP * scaleSP)

      unit.bonusEssence += essenceAmount
    }

    let gainEssence = function (unit, trigger, data) {
      let SP = unit.betaSP
      let scaleSP = 0.25
      let essenceAmount = Math.ceil(SP * scaleSP)

      unit.bonusEssence += essenceAmount
    }

    let getLogItemBatStart = function (unit, trigger, data) {
      let SP = unit.betaSP
      let scaleSP = 0.25
      let essenceAmount = Math.ceil(SP * scaleSP)

      let newData = {
        type: 'initessence',
        essenceAmount: essenceAmount, // data.amount,
        caster: unit,
        target: unit
      }

      let log = [
        {
          text: `${newData.caster.name} entered the battlefield with ${essenceAmount} essence!`,
          type: 'initessence',
          amount: newData.essenceAmount,
          caster: unit,
          target: unit
        }
      ]

      let summary = {
        data: newData,
        log: log
      }
      return summary
    }

    let getLogItemRoundStart = function (unit, trigger, data) {
      let SP = unit.betaSP
      let scaleSP = 0.25
      let essenceAmount = Math.ceil(SP * scaleSP)

      let newData = {
        type: 'roundessence',
        essenceAmount: essenceAmount,
        caster: unit,
        target: unit
      }

      let log = [
        {
          text: `${newData.caster.name} gained ${essenceAmount} essence at round start!`,
          type: 'initessence',
          amount: newData.essenceAmount,
          caster: unit,
          target: unit
        }
      ]

      let summary = {
        data: newData,
        log: log
      }
      return summary
    }

    return new Status({
      NAME: 'ESSENCEUSER',
      name: 'essenceuser',
      desc: `Generates essence at start of battle and each round.`,
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'ESSENCESTART',
          name: 'essencestart',
          trigger: ['BATSTART'],
          // amount: amount,
          // virulence: ... ,
          // scaleDivided: 0.5,
          scaleSP: 0.25,
          scaleBase: 0,
          update: initEssence,
          getLogItem: getLogItemBatStart
        },
        {
          NAME: 'ESSENCEROUND',
          name: 'essenceround',
          trigger: ['ROUNDSTART'],
          // amount: amount,
          // virulence: ... ,
          // scaleDivided: 0.5,
          scaleSP: 0.25,
          scaleBase: 0,
          update: gainEssence,
          getLogItem: getLogItemRoundStart
        }
      ]
    })
  }
}
var obj = {
  filename: 'ESSENCEUSER',
  exprt: ESSENCEUSER
}
export default obj
// export default Yolomace
