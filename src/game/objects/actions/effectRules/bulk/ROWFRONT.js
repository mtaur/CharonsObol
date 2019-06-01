// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
import { Unit } from '../../../units/Unit.js'

function ROWFRONT (effectObj = {}, target = {}, caster = {}) {
  let apply = function () {
    caster.pos = Unit.POS.FRONT
    if (caster.side === Unit.SIDE.PLAYER) {
      for (let index in caster.playerTeam.back) {
        if (caster.playerTeam.back[index].id === caster.id) {
          caster.playerTeam.back.splice(index, 1)
          caster.playerTeam.front.push(caster)
        }
      }
    } else if (caster.side === Unit.SIDE.CPU) {
      for (let index in caster.cpuTeam.back) {
        if (caster.cpuTeam.back[index].id === caster.id) {
          caster.cpuTeam.back.splice(index, 1)
          caster.cpuTeam.front.push(caster)
        }
      }
    }
  }
  return apply
}

ROWFRONT.NAME = 'ROWFRONT'

export default ROWFRONT