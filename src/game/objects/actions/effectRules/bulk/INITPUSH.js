// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function INITPUSH (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    // let amount = effectObj.delayFrac * target.maxTurnPoints
    let data = {
      type: 'initpush',
      // amount: amount,
      caster: caster,
      target: target,
      times: effectObj.times
    }
    let log = [
      {
        text: `${target.name} restored ${data.times} initiative tokens.`,
        type: 'initpush',
        // value: amount,
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
    let summary = this.summarize()
    // let data = summary.data

    for (let i = 1; i <= effectObj.times; i++) {
      target.allies.initArr.push(caster.allies.checkInitArr[0])
      // target.allies.initArr.push(caster.effectiveStatValues.INIT)
    }
    // decreasing order! Could have used "unshift" and skipped this step
    // due to rework (use first token instead of caster)
    target.allies.initArr.sort((a, b) => { return b - a })

    this.summary = summary
  }
  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'INITPUSH',
  exprt: INITPUSH
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
