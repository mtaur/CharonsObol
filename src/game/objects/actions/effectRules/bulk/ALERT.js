// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function ALERT (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let amount = effectObj.alertFrac * target.maxTurnPoints
    let data = {
      type: 'alert',
      amount: amount,
      caster: caster,
      target: target
    }
    let log = [
      {
        text: `${caster.name} inspired their team to action. ${amount} Turn Points gained.`,
        type: 'alert',
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

    target.allies.turnPoints += effectObj.alertFrac * target.allies.maxTurnPoints

    this.summary = summary
  }
  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'ALERT',
  exprt: ALERT
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
