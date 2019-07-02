// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
import { Status } from '../../../statuses/Status.js'

function GUARD (effectObj = {}, target = {}, caster = {}) {
  let apply = function () {
    caster.statuses.push(new Status.LIB.GUARD())
    // this.summary.text =
    this.summary =
    [
      {
        text: `${caster.name} guarded.`,
        type: 'guard',
        // value: Math.floor(this.summary.reflected),
        caster: caster // ,
        // target: target
      }
    ]
    // console.log(this.summary.text)
  }
  return apply
}
var obj = {
  filename: 'GUARD',
  exprt: GUARD
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
