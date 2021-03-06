// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function ROWBACK (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'rowback',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} moved to the back row.`,
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
  filename: 'ROWBACK',
  exprt: ROWBACK
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
