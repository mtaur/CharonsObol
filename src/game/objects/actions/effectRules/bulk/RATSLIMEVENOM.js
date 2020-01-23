// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
import { Status } from '../../../statuses/Status.js'

function RATSLIMEVENOM (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'ratslimevenom',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} applied ratslime venom.`,
        type: 'ratslimevenom',
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
    target.statuses.push(new Status.LIB.DAMAGEECHOPOISONOUTSELF())
    target.statuses.push(new Status.LIB.DAMAGEECHOPOISONOUT())
    // this.summary.text =
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} guarded.`,
    //     type: 'guard',
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
  filename: 'RATSLIMEVENOM',
  exprt: RATSLIMEVENOM
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
