// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
// import { Status } from '../../../statuses/Status.js'

function BREWOIL (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'brewoil',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${target.name} brewed a questionable substance.`,
        type: 'brewoil',
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
    if (!hasProp(target.allies.inventory, 'RATSLIMEOIL')) {
      target.allies.inventory.RATSLIMEOIL = 0
    }
    target.allies.inventory.RATSLIMEOIL += 1
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
  filename: 'BREWOIL',
  exprt: BREWOIL
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
