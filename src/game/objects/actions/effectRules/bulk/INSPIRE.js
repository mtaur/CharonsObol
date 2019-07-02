// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function INSPIRE (effectObj = {}, target = {}, caster = {}) {
  let apply = function () {
    // effects: [{
    //   NAME: 'INSPIRE',
    //   name: 'inspire',
    //   major: true,
    //   minor: false
    // }]
    if (effectObj.major) {
      target.hasAction.major = true
    }
    if (effectObj.minor) {
      target.hasAction.minor = true
    }
    this.summary =
    [
      {
        text: `${caster.name} inspired ${target.name}!`,
        type: 'inspire',
        // value: Math.floor(this.summary.reflected),
        caster: caster,
        target: target
      },
      {
        text: `${target.name}'s major action point was restored.`,
        type: 'inspire',
        // value: Math.floor(this.summary.reflected),
        caster: caster,
        target: target
      }
    ]
  // console.log(this.summary.text)
  }
  return apply
}
var obj = {
  filename: 'INSPIRE',
  exprt: INSPIRE
}
export default obj
//
// INSPIRE.NAME = 'INSPIRE'
//
// export default INSPIRE
