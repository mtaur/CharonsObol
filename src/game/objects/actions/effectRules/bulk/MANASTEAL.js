// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function MANASTEAL (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'manasteal',
      caster: caster,
      target: target,
      value: effectObj.value
    }
    let log =
    [
      {
        text: `${caster.name} stole ${effectObj.value} MP from ${target.name}!`,
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

    caster.baseStats.MP.current += effectObj.value
    target.baseStats.MP.current -= effectObj.value
    caster.baseStats.MP.current = Math.min(caster.baseStats.MP.current, caster.baseStats.MP.max)
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
  filename: 'MANASTEAL',
  exprt: MANASTEAL
}
export default obj
//
// INSPIRE.NAME = 'INSPIRE'
//
// export default INSPIRE
