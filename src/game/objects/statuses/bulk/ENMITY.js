import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class ENMITY {
  static NAME = 'ENMITY'
  static filename = 'ENMITY'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let healSelf = function (unit, trigger, data) {
      // let amount = data.amount
      let target = data.target
      let caster = data.caster

      let healAmount = this.scaleMagic * caster.effectiveStatValues.MAGIC + this.scaleTargLife * target.baseStats.HP.max
      healAmount = Math.ceil(healAmount)
      healAmount = Math.min(healAmount, caster.baseStats.HP.max - caster.baseStats.HP.current)

      let reverseForEach = (arr, fcn) => {
        for (let index = arr.length - 1; index >= 0; index--) {
          fcn(arr[index])
          index = Math.min(index, arr.length)
        }
      }
      let enmityData = {
        type: 'enmity',
        amount: healAmount, // data.amount,
        // preventAmount: data.actualAmount,
        caster: data.caster,
        target: data.caster
      }

      reverseForEach(caster.statuses, (status) => status.clearCheck(target, 'GETHEAL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.clearCheck(caster, 'HEAL')) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(target, 'GETHEAL', enmityData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))
      reverseForEach(caster.statuses, (status) => status.triggerCheckEffect(caster, 'HEAL', enmityData)) // target.statuses.forEach((status) => status.clearCheck(target, 'TAKEDAMAGE'))

      caster.baseStats.HP.current += healAmount
    }

    let getLogItem = function (unit, trigger, data) {
      let caster = data.caster
      let target = data.target
      // let amount = data.amount // damage amount
      let healAmount = this.scaleMagic * caster.effectiveStatValues.MAGIC + this.scaleTargLife * target.baseStats.HP.max

      healAmount = Math.min(healAmount, caster.baseStats.HP.max - caster.baseStats.HP.current)

      let newData = {
        type: 'enmity',
        amount: healAmount, // data.amount,
        // preventAmount: data.actualAmount,
        caster: data.caster,
        target: data.target
      }
      let log = [
        {
          // text: `${newData.caster.name} healed self by ${healAmount}!  The darkness...`,
          text: `${newData.caster.name} healed self by ${newData.amount}!  The darkness...`,
          type: 'enmity',
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
      NAME: 'ENMITY',
      name: 'enmity',
      desc: `Heals self for 1x MAGIC after each kill.`,
      remove: [
        //
      ],
      effects: [
        {
          NAME: 'ENMITY',
          name: 'enmity',
          trigger: ['KILL'],
          // amount: amount,
          // virulence: ... ,
          // scaleDivided: 0.5,
          scaleMagic: 0.5, // 1,
          scaleTargLife: 0,
          update: healSelf,
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
  filename: 'ENMITY',
  exprt: ENMITY
}
export default obj
// export default Yolomace
