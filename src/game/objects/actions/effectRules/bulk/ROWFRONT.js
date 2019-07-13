// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function ROWFRONT (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'rowfront',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} moved to the front row.`,
        type: 'move',
        // value: Math.floor(this.summary.reflected),
        caster: caster // ,
        // target: target
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

    target.pos = Unit.POS.FRONT
    if (target.side === Unit.SIDE.PLAYER) {
      for (let index in target.playerTeam.back) {
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
    // this.summary.text =
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} moved to the front row.`,
    //     type: 'move',
    //     // value: Math.floor(this.summary.reflected),
    //     caster: caster // ,
    //     // target: target
    //   }
    // ]
    // console.log(this.summary.text)
  }
  return { apply: apply, summarize: summarize }
  // return apply
}
var obj = {
  filename: 'ROWFRONT',
  exprt: ROWFRONT
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
