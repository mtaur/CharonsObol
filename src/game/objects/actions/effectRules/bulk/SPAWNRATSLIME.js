// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'
// import { Unit } from '../../../units/Unit.js'
// import { Status } from '../../../statuses/Status.js'
import { UnitTemplate } from 'src/game/objects/units/templates/UnitTemplate.js'

function SPAWNRATSLIME (effectObj = {}, target = {}, caster = {}) {
  let summarize = function () {
    let data = {
      type: 'spawnratslime',
      caster: caster,
      target: target
    }
    let log =
    [
      {
        text: `${caster.name} spawned a RATSLIME minion!`,
        type: 'ratslime',
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

  let apply = function () {
    // let cast = caster
    // caster.statuses.forEach((status) => status.clearCheck(caster, 'DRYAD'))
    this.summary = this.summarize()
    // caster.statuses.push(new Status.LIB.DRYAD())
    // let ratslime = new UnitTemplate.LIB.RATSLIME({ side: caster.side, caster: caster }, { playerTeam: caster.playerTeam, cpuTeam: caster.cpuTeam })
    let ratslime = new UnitTemplate.LIB.RATSLIME({ playerTeam: caster.playerTeam, cpuTeam: caster.cpuTeam })
    caster.allies.deploy(ratslime)
    // removeDuplicates(unit.actions)
    // cast.allies.front.push(zombie)
    // caster.allies.front.push(new UnitTemplate.LIB.ZOMBIE())
  }
  return { apply: apply, summarize: summarize }
  // return apply
}
var obj = {
  filename: 'SPAWNRATSLIME',
  exprt: SPAWNRATSLIME
}
export default obj
// ROWFRONT.NAME = 'ROWFRONT'
//
// export default ROWFRONT
