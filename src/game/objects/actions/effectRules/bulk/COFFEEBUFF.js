// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
import { Status } from '../../../statuses/Status.js'

function COFFEEBUFF (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let stacks = 1 + findCopies().length
    let data = {
      type: 'coffeebuff',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${caster.name} gains a stack of COFFEE buff.`,
        type: 'coffeebuff',
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
    return caster.statuses.filter((status) => status.NAME === 'COFFEEBUFF')
  }

  let apply = function () {
    this.summary = this.summarize()
    caster.statuses.push(new Status.LIB.COFFEEBUFF(effectObj, {}, caster))
  }

  return { apply: apply, summarize: summarize }
  // return apply
}

var obj = {
  filename: 'COFFEEBUFF',
  exprt: COFFEEBUFF
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
