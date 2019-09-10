// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function RUN (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'run',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} ran away!`,
        type: 'run',
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
      target.pos = Unit.POS.BENCH
      if (target.side === Unit.SIDE.PLAYER) {
        for (let index in target.playerTeam.front) {
          if (target.playerTeam.front[index].id === target.id) {
            target.playerTeam.front.splice(index, 1)
            target.playerTeam.bench.push(target)
          }
        }
      } else if (target.side === Unit.SIDE.CPU) {
        for (let index in target.cpuTeam.front) {
          if (target.cpuTeam.front[index].id === target.id) {
            target.cpuTeam.front.splice(index, 1)
            target.cpuTeam.bench.push(target)
          }
        }
      }
    } else if (target.pos === Unit.POS.BACK) {
      target.pos = Unit.POS.FRONT
      if (target.side === Unit.SIDE.PLAYER) {
        for (let index in target.playerTeam.back) {
          if (target.playerTeam.back[index].id === target.id) {
            target.playerTeam.back.splice(index, 1)
            target.playerTeam.bench.push(target)
          }
        }
      } else if (target.side === Unit.SIDE.CPU) {
        for (let index in target.cpuTeam.back) {
          if (target.cpuTeam.back[index].id === target.id) {
            target.cpuTeam.back.splice(index, 1)
            target.cpuTeam.bench.push(target)
          }
        }
      }
    }
  }
  return { apply: apply, summarize: summarize }
  // return apply
}
var obj = {
  filename: 'RUN',
  exprt: RUN
}
export default obj
