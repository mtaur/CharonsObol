// import { Unit } from '../../units/Unit.js'
// import { Action } from '../Action.js'
import { classdir as ruleLib } from './jsload.js'
// import { cloneDeep as clone, hasIn as hasProp } from 'lodash'
import { hasIn as hasProp } from 'lodash'

class EffectRule {
  // allies = []
  // enemies = []
  // playerTeam = []
  // cpuTeam = []
  // prevTargs = []
  caster = {}
  target = {}
  effectName = ''
  apply = function () {}
  summary = {}
  // summary = { text: , ... }

  static LIB = {}

  constructor (effectObj = {}, target = {}, caster = {}) {
    // let templ = {
    //   caster: {},
    //   target: {},
    //   effectName: ''
    // }
    // for (let key in templ) {
    //   this[key] = hasProp(obj, key) ? obj[key] : templ[key]
    // }
    // let apply = function (target = {}, caster = {}) {}
    if (hasProp(EffectRule.LIB, effectObj.NAME)) {
      // effectObj.summary = {}
      // this.summary = effectObj.summary
      this.apply = EffectRule.LIB[effectObj.NAME](effectObj, target, caster)
      this.name = effectObj.name
      this.NAME = effectObj.NAME
      // this.summary = effectObj.summary
    }
  }
}

// populate library using jsload from ./bulk
for (let key in ruleLib) {
  let NamedRule = ruleLib[key]
  // if (!EffectRule.LIB[NamedRule.NAME]) { EffectRule.LIB[NamedRule.NAME] = NamedRule }
  if (!EffectRule.LIB[NamedRule.filename]) { EffectRule.LIB[NamedRule.filename] = NamedRule.exprt }
}

export { EffectRule }
