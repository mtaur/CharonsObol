// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function CASTERBACK (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'casterback',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${caster.name} moved to the back row.`,
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

    caster.pos = Unit.POS.BACK
    if (caster.side === Unit.SIDE.PLAYER) {
      for (let index in caster.playerTeam.front) {
        if (caster.playerTeam.front[index].id === caster.id) {
          caster.playerTeam.front.splice(index, 1)
          caster.playerTeam.back.push(caster)
        }
      }
    } else if (caster.side === Unit.SIDE.CPU) {
      for (let index in caster.cpuTeam.front) {
        if (caster.cpuTeam.front[index].id === caster.id) {
          caster.cpuTeam.front.splice(index, 1)
          caster.cpuTeam.back.push(caster)
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
  filename: 'CASTERBACK',
  exprt: CASTERBACK
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
