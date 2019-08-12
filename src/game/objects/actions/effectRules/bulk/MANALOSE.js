// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function MANALOSE (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'manalose',
      caster: caster,
      target: target,
      value: effectObj.value
    }
    let log =
    [
      {
        text: `${target.name} loses ${effectObj.value} MP!`,
        type: 'manalose',
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
    target.baseStats.MP.current -= effectObj.value
  }
  // return apply
  return { apply: apply, summarize: summarize }
}
var obj = {
  filename: 'MANALOSE',
  exprt: MANALOSE
}
export default obj
//
// INSPIRE.NAME = 'INSPIRE'
//
// export default INSPIRE
