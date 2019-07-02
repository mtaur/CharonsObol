// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function ROWSWAP (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'rowfront',
      caster: caster
    }
    let log =
    [
      {
        text: `${caster.name} inspired ${target.name}!`,
        type: 'inspire',
        // value: Math.floor(this.summary.reflected),
        caster: caster,
        target: target
      },
      {
        text: `${target.name}'s major action point was restored.`,
        type: 'inspire',
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

    if (caster.pos === Unit.POS.FRONT) {
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
    } else if (caster.pos === Unit.POS.BACK) {
      caster.pos = Unit.POS.FRONT
      if (caster.side === Unit.SIDE.PLAYER) {
        for (let index in caster.playerTeam.back) {
          if (caster.playerTeam.back[index].id === caster.id) {
            caster.playerTeam.back.splice(index, 1)
            caster.playerTeam.front.push(caster)
          }
        }
      } else if (caster.side === Unit.SIDE.CPU) {
        for (let index in caster.cpuTeam.back) {
          if (caster.cpuTeam.back[index].id === caster.id) {
            caster.cpuTeam.back.splice(index, 1)
            caster.cpuTeam.front.push(caster)
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
