// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
import { Status } from '../../../statuses/Status.js'

function STORMCLOUDBUFF (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let stacks = 1 + findCopies().length
    let data = {
      type: 'stormcloudbuff',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${caster.name} gains a stack of STORMCLOUD buff.`,
        type: 'stormcloudbuff',
        stacks: stacks,
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

  let findCopies = function () {
    return caster.statuses.filter((status) => status.NAME === 'STORMCLOUDBUFF')
  }

  let apply = function () {
    this.summary = this.summarize()
    caster.statuses.push(new Status.LIB.STORMCLOUDBUFF(effectObj, {}, caster))
  }

  return { apply: apply, summarize: summarize }
  // return apply
}

var obj = {
  filename: 'STORMCLOUDBUFF',
  exprt: STORMCLOUDBUFF
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
