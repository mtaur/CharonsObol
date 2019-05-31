import { Action } from '../Action.js'
import { Unit } from '../../units/Unit.js'

class NATLOG {
  static NAME = 'NATLOG'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    let length = unit.side === Unit.SIDE.PLAYER ? unit.cpuTeam.field.length : unit.playerTeam.field.length
    let targRules = []
    let effects = []
    for (let j = 0; j < length; j++) {
      targRules.push('NATLOG')
      effects.push({
        NAME: 'DAMAGE',
        name: 'damage',
        scale: {
          MAGIC: 1 / (j + 1)
        },
        DREDScale: 1 / (j + 1),
        DREFScale: 1 / (j + 1)
      })
    }

    return new Action({
      unit: unit,
      NAME: 'NATLOG',
      name: 'Natural Log',
      type: 'major',
      desc: 'A vengeful bouncing log deals 1xMAGIC damage to a chosen enemy, (1/2)xMAGIC damage to a second, (1/3)xMAGIC damage to a third, and so on until no more targets are available.',
      cost: 2,
      targetRules: targRules,
      effects: effects
    })
  }
}

export default NATLOG
