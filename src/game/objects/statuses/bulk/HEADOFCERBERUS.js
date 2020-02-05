import { Status } from '../Status.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../units/Stat.js'

// console.log(Soul)
class HEADOFCERBERUS {
  static NAME = 'HEADOFCERBERUS'
  static filename = 'HEADOFCERBERUS'

  constructor (effectObj = {}, target = {}, caster = {}) {
    let loseHeads = function (unit, trigger, data) {
      let caster = unit // data.caster
      // let target = unit // data.target
      let reverseForEachFull = (arr, fcn) => {
        for (let index = arr.length - 1; index >= 0; index--) {
          fcn(arr[index], index, arr)
          index = Math.min(index, arr.length)
        }
      }
      // let heads = []
      // let passivesLost = []
      // let log = []

      caster.allies.dead.forEach((ally) => {
        let purgeIfMatch = (item, index, arr) => {
          if (ally.souls[0].NAME === item.NAME) {
            arr.splice(index, 1)
            // heads.push(item)
            // let logItem = {
            //   text: `${unit.name} loses a head!`,
            //   type: 'losehead',
            //   NAME: item.NAME,
            //   caster: caster,
            //   target: target
            // }
            // log.push(logItem)
          }
        }
        let purgeStatusIfMatch = (status, index, arr) => {
          if (ally.souls[0].passives.some((passive) => { return passive.NAME === status.NAME })) {
            arr.splice(index, 1)
            // passivesLost.push(status)
            // let logItem = {
            //   text: `${unit.name} loses a head!`,
            //   type: 'losehead',
            //   NAME: status.NAME,
            //   // amount: newData.amount,
            //   // virulence: this.effects[0].virulence,
            //   // virulence: thisObj.effects[0].virulence,
            //   // virulence: virulence,
            //   caster: caster,
            //   target: target
            // }
            // log.push(logItem)
          }
        }
        let purgeSkillIfMatch = (action, index, arr) => {
          if (ally.souls[0].skills.some((skill) => { return skill === action.NAME })) {
            arr.splice(index, 1)
          }
        }

        reverseForEachFull(caster.souls, purgeIfMatch)
        reverseForEachFull(caster.statuses, purgeStatusIfMatch)
        reverseForEachFull(caster.statuses, purgeSkillIfMatch)
      })
    }

    // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, data)
    // this.effects[effectIndx].update(unit, trigger, data)
    let getLogItem = function (unit, trigger, data) {
      let caster = unit // data.caster
      let target = unit // data.target
      let reverseForEachFull = (arr, fcn) => {
        for (let index = arr.length - 1; index >= 0; index--) {
          fcn(arr[index], index, arr)
          index = Math.min(index, arr.length)
        }
      }
      let heads = []
      // let passivesLost = []
      let log = []

      caster.allies.dead.forEach((ally) => {
        let headLog = (item, index, arr) => {
          if (ally.souls[0].NAME === item.NAME) {
            // arr.splice(index, 1)
            heads.push(item)
            let logItem = {
              text: `${unit.name} loses a head!`,
              type: 'losehead',
              NAME: item.NAME,
              caster: caster,
              target: target
            }
            log.push(logItem)
          }
        }
        // let purgeStatusIfMatch = (status, index, arr) => {
        //   if (ally.souls[0].passives.some((passive) => { return passive.NAME === status.NAME })) {
        //     arr.splice(index, 1)
        //     passivesLost.push(status)
        //     let logItem = {
        //       text: `${unit.name} loses a head!`,
        //       type: 'losehead',
        //       NAME: status.NAME,
        //       // amount: newData.amount,
        //       // virulence: this.effects[0].virulence,
        //       // virulence: thisObj.effects[0].virulence,
        //       // virulence: virulence,
        //       caster: caster,
        //       target: target
        //     }
        //     log.push(logItem)
        //   }
        // }

        reverseForEachFull(caster.souls, headLog)
        // reverseForEachFull(caster.statuses, purgeStatusIfMatch)
      })

      let newData = {
        type: 'loseheads',
        heads: heads,
        // amount: heads.length,
        // preventAmount: data.actualAmount,
        caster: unit,
        target: unit
      }
      // let log = [
      // ]

      // selector.logID++
      let summary = {
        data: newData,
        log: log // ,
        // id: selector.logID
      }
      return summary
    }

    return new Status({
      NAME: 'HEADOFCERBERUS',
      name: 'headofcerberus',
      desc: 'Lose souls and passives belonging to slain allies.',
      remove: [
        //
      ],
      replacements: [
        {
          statName: 'INIT',
          value: function (unit) {
            return (1 + (unit.souls.length * 0.15)) * unit.convertedStatValues.INIT
          }
        },
        {
          statName: 'MELEE',
          value: function (unit) {
            return (1 + (unit.souls.length * 0.15)) * unit.convertedStatValues.MELEE
          }
        },
        {
          statName: 'RANGED',
          value: function (unit) {
            return (1 + (unit.souls.length * 0.15)) * unit.convertedStatValues.RANGED
          }
        },
        {
          statName: 'MAGIC',
          value: function (unit) {
            return (1 + (unit.souls.length * 0.15)) * unit.convertedStatValues.MAGIC
          }
        },
        {
          statName: 'DRED',
          value: function (unit) {
            return (1 + (unit.souls.length * 0.15)) * unit.convertedStatValues.DRED
          }
        },
        {
          statName: 'DREF',
          value: function (unit) {
            return (1 + (unit.souls.length * 0.15)) * unit.convertedStatValues.DREF
          }
        }
      ],
      effects: [
        {
          NAME: 'HEADOFCERBERUS',
          name: 'headofcerberus',
          trigger: ['ROUNDSTART'],
          // amount: 1,
          // virulence: virulence,
          update: loseHeads,
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
  filename: 'HEADOFCERBERUS',
  exprt: HEADOFCERBERUS
}
export default obj
// export default Yolomace
