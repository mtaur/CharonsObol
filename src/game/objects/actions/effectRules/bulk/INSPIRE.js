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
  }
  return apply
}

INSPIRE.NAME = 'INSPIRE'

export default INSPIRE
