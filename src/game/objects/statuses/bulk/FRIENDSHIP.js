import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class FRIENDSHIP {
  static NAME = 'FRIENDSHIP'
  static filename = 'FRIENDSHIP'

  constructor (effectObj = {}, target = {}, caster = {}) {
    // update: shareHeal
    let shareHeal = function (unit, trigger, data) {
      let amount = data.amount
      let target = data.target
      // let caster = data.caster

      // this.scaleDivided = 0.5
      // this.scaleFixed = 0
      let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })
      let maxHeal = amount * (this.scaleFixed + this.scaleDivided / Math.max(targetAllies.length, 1))
      maxHeal = Math.ceil(maxHeal)

      targetAllies.forEach((ally) => {
        ally.baseStats.HP.current += Math.min(maxHeal, ally.baseStats.HP.max - ally.baseStats.HP.current)
      })
    }

    let getLogItem = function (unit, trigger, data) {
      let caster = data.caster
      let target = data.target
      let amount = data.amount

      // this.scaleDivided = 0.5
      // this.scaleFixed = 0
      let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })
      let maxHeal = amount * (this.scaleFixed + this.scaleDivided / Math.max(targetAllies.length, 1))
      maxHeal = Math.ceil(maxHeal)

      let newData = {
        type: 'friendship',
        amount: maxHeal, // data.amount,
        // preventAmount: data.actualAmount,
        caster: data.caster,
        target: data.target
      }
      let log = [
        {
          text: `${newData.target.name} healed each ally by ${maxHeal}!`,
          type: 'friendship',
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
      NAME: 'FRIENDSHIP',
      name: 'friendship',
      desc: `Incoming heals also heal this unit's allies by 50% of the incoming heal ` +
        `amount, split evenly among them.`,
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'FRIENDSHIP',
          name: 'friendship',
          trigger: ['GETHEAL'],
          // amount: amount,
          // virulence: ... ,
          scaleDivided: 0.5,
          scaleFixed: 0,
          update: shareHeal,
          getLogItem: getLogItem
        }
      ]
    })
  }
}
var obj = {
  filename: 'FRIENDSHIP',
  exprt: FRIENDSHIP
}
export default obj
// export default Yolomace
