// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function LOSEACTMAJOR (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    // let amount = effectObj.delayFrac * target.maxTurnPoints
    let data = {
      type: 'loseactminor',
      // amount: amount,
      caster: caster,
      target: target
    }
    let log = [
      {
        text: `${target.name} lost their minor action.`,
        type: 'loseactminor',
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

    target.hasAction.major = false
    if (target.allies.initArr.length > 0) { target.allies.initArr.shift() }
    if (target.allies.initArr.length > 0) { target.allies.initArr.shift() }
    // target.allies.turnPoints -= effectObj.delayFrac * target.allies.maxTurnPoints

    this.summary = summary
  }
  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'LOSEACTMAJOR',
  exprt: LOSEACTMAJOR
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
