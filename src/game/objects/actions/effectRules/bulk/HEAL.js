// import { TargetRule } from '../TargetRule.js'
import { hasIn as hasProp } from 'lodash'
import { Stat } from '../../../units/Stat.js'

function HEAL (effectObj = {}, target = {}, caster = {}) {
  let apply = function () {
    let amount = 0
    for (let statName in Stat.LIB) {
      if (hasProp(effectObj.scale, statName)) {
        console.log('effectObj:', effectObj)
        amount += caster.effectiveStatValues[statName] * effectObj.scale[statName]
      }
    }
    if (hasProp(effectObj.scale, 'min')) {
      let minScale = 9001
      for (let statName in Stat.LIB) {
        let scaleVal = caster.effectiveStatValues[statName] * effectObj.scale.min[statName]
        if (scaleVal < minScale) { minScale = scaleVal }
      }
      amount += minScale
    }
    // console.log('target:', target)
    // console.log(target.effectiveStatValues)
    // console.log(target.baseStats.HP.current)
    console.log(amount)
    // amount -= target.effectiveStatValues.DRED * effectObj.DREDScale
    // console.log(amount)
    // amount = Math.max(0, Math.floor(amount))
    target.baseStats.HP.current += amount
    target.baseStats.HP.current = target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
    // caster.baseStats.HP.current -= effectObj.DREFScale * target.effectiveStatValues.DREF
    // caster.baseStats.HP.current = caster.baseStats.HP.current > 0 ? Math.floor(caster.baseStats.HP.current) : 0
  }
  return apply
}

HEAL.NAME = 'HEAL'

export default HEAL