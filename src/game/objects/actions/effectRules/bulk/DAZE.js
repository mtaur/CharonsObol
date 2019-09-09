// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function DAZE (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let amount = effectObj.delayFrac * target.allies.maxTurnPoints
    let data = {
      type: 'daze',
      amount: amount,
      caster: caster,
      target: target
    }
    let log = [
      {
        text: `${caster.name} dazed ${target.name}. ${amount} Turn Points lost.`,
        type: 'daze',
        value: amount,
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

    target.allies.turnPoints -= effectObj.delayFrac * target.allies.maxTurnPoints

    this.summary = summary
  }
  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'DAZE',
  exprt: DAZE
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
