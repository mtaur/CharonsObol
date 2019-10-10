// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function ROWSWAP (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'rowswap',
      caster: caster
    }
    let log =
    [
      {
        text: `${target.name} swapped rows.`,
        type: 'move',
        // value: Math.floor(this.summary.reflected),
        caster: caster,
        target: target
      }
    ]
    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let apply = function () {
    this.summary = this.summarize()

    if (target.pos === Unit.POS.FRONT) {
      target.pos = Unit.POS.BACK
      if (target.side === Unit.SIDE.PLAYER) {
        for (let index in target.playerTeam.front) {
          if (target.playerTeam.front[index].id === target.id) {
            target.playerTeam.front.splice(index, 1)
            target.playerTeam.back.push(target)
          }
        }
      } else if (target.side === Unit.SIDE.CPU) {
        for (let index in target.cpuTeam.front) {
          if (target.cpuTeam.front[index].id === target.id) {
            target.cpuTeam.front.splice(index, 1)
            target.cpuTeam.back.push(target)
          }
        }
      }
    } else if (target.pos === Unit.POS.BACK) {
      target.pos = Unit.POS.FRONT
      if (target.side === Unit.SIDE.PLAYER) {
        for (let index in caster.playerTeam.back) {
          if (target.playerTeam.back[index].id === target.id) {
            target.playerTeam.back.splice(index, 1)
            target.playerTeam.front.push(target)
          }
        }
      } else if (target.side === Unit.SIDE.CPU) {
        for (let index in target.cpuTeam.back) {
          if (target.cpuTeam.back[index].id === target.id) {
            target.cpuTeam.back.splice(index, 1)
            target.cpuTeam.front.push(target)
          }
        }
      }
    }
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} swapped rows.`,
    //     type: 'move',
    //     // value: Math.floor(this.summary.reflected),
    //     caster: caster // ,
    //     // target: target
    //   }
    // ]
    // this.summary.text =
    // console.log(this.summary.text)
    // console.log('Unit moved?', caster)
  }
  return { apply: apply, summarize: summarize }
  // return apply
}
var obj = {
  filename: 'ROWSWAP',
  exprt: ROWSWAP
}
export default obj
// ROWSWAP.NAME = 'ROWSWAP'
//
// export default ROWSWAP
