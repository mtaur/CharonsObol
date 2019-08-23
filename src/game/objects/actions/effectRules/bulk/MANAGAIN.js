// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function MANAGAIN (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'managain',
      caster: caster,
      target: target,
      value: effectObj.value
    }
    let log =
    [
      {
        text: `${target.name} gains ${effectObj.value} MP!`,
        type: 'managain',
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
    target.baseStats.MP.current += effectObj.value
    if (target.baseStats.MP.current >= target.effectiveStatValues.MP) {
      target.baseStats.MP.current = target.effectiveStatValues.MP
    }
  }
  // return apply
  return { apply: apply, summarize: summarize }
}
var obj = {
  filename: 'MANAGAIN',
  exprt: MANAGAIN
}
export default obj
//
// INSPIRE.NAME = 'INSPIRE'
//
// export default INSPIRE
