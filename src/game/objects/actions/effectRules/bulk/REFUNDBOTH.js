// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function REFUNDBOTH (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'inspire',
      caster: caster,
      target: caster
    }
    let log =
    [
      {
        text: `${caster.name} inspired ${caster.name}!`,
        type: 'inspire',
        // value: Math.floor(this.summary.reflected),
        caster: caster,
        target: target
      },
      {
        text: `${caster.name}'s action points were restored.`,
        type: 'inspire',
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
    // effects: [{
    //   NAME: 'INSPIRE',
    //   name: 'inspire',
    //   major: true,
    //   minor: false
    // }]
    this.summary = this.summarize()

    caster.hasAction.major = true
    caster.hasAction.minor = true
    // this.summary =
    // [
    //   {
    //     text: `${caster.name} inspired ${target.name}!`,
    //     type: 'inspire',
    //     // value: Math.floor(this.summary.reflected),
    //     caster: caster,
    //     target: target
    //   },
    //   {
    //     text: `${target.name}'s major action point was restored.`,
    //     type: 'inspire',
    //     // value: Math.floor(this.summary.reflected),
    //     caster: caster,
    //     target: target
    //   }
    // ]
  // console.log(this.summary.text)
  }
  // return apply
  return { apply: apply, summarize: summarize }
}
var obj = {
  filename: 'REFUNDBOTH',
  exprt: REFUNDBOTH
}
export default obj
//
// INSPIRE.NAME = 'INSPIRE'
//
// export default INSPIRE
