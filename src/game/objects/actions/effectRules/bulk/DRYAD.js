// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
import { Status } from '../../../statuses/Status.js'

function DRYAD (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'dryad',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${caster.name} went into Dryad Form.`,
        type: 'dryad',
        // value: Math.floor(this.summary.reflected),
        caster: caster // ,
        // target: target
      }
    ]
    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let apply = function () {
    caster.statuses.forEach((status) => status.clearCheck(caster, 'DRYAD'))
    this.summary = this.summarize()
    caster.statuses.push(new Status.LIB.DRYAD())
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
  filename: 'DRYAD',
  exprt: DRYAD
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
