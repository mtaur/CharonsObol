// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
// import { Status } from '../../../statuses/Status.js'

function BREWVENOM (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'brewvenom',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} brewed a questionable and deadly substance.`,
        type: 'brewvenom',
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
    if (!hasProp(target.allies.inventory, 'RATSLIMEVENOM')) {
      target.allies.inventory.RATSLIMEVENOM = 0
    }
    target.allies.inventory.RATSLIMEVENOM += 1
    // target.statuses.push(new Status.LIB.CRANK())
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
  filename: 'BREWVENOM',
  exprt: BREWVENOM
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
