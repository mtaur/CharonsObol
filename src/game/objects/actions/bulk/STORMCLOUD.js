import { TargetRule } from '../targetRules/TargetRule.js'
// import { EffectRule } from '../effectRules/EffectRule.js'
import { Action } from '../Action.js'
// import { Unit } from '../../units/Unit.js'

class STORMCLOUD {
  static NAME = 'STORMCLOUD'
  static filename = 'STORMCLOUD'

  constructor (unit = null) {
    let computeProps = function (input) {
      let length = 1 + input.statuses.filter((status) => status.NAME === 'STORMCLOUDBUFF').length
      // input.side === Unit.SIDE.PLAYER ? input.cpuTeam.field.length : input.playerTeam.field.length
      let targRules = ['SELF']
      // console.log(EffectRule.LIB.STORMCLOUDBUFF)
      let effects = [
        {
          NAME: 'STORMCLOUDBUFF',
          name: 'stormcloudbuff',
          caster: unit,
          target: unit
        }
        // EffectRule.LIB.STORMCLOUDBUFF({}, {}, unit)
      ]
      // ['STORMCLOUDBUFF']
      for (let j = 0; j < length; j++) {
        targRules.push('STORMCLOUDBOLT')
        effects.push({
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 0.5 / (j + 1)
          },
          DREDScale: 0.5 / (j + 1),
          DREFScale: 0.5 / (j + 1)
        })
      }
      return {
        targRules: targRules,
        effects: effects
      }
    }

    // let thisUnit = unit
    let rebuild = function (act, unt) {
      act.targetRules = computeProps(unt).targRules
      act.targetRules = act.targetRules.map((str) => TargetRule.LIB[str])
      act.effects = computeProps(unt).effects
    }

    // let action = new Action({...})
    return new Action({
      unit: unit,
      NAME: 'STORMCLOUD',
      filename: 'STORMCLOUD',
      name: 'Stormcloud',
      type: 'major',
      desc: 'Gathering storm clouds apply stacking 10% base MAGIC buff. Deals damage ' +
        'to one RANDOM enemy target per stack.  First deals 1x MAGIC/2, then (1/2)x MAGIC/2, then ' +
        '(1/3)x MAGIC/2, etc.',
      cost: 1,
      targetRules: computeProps(unit).targRules,
      effects: computeProps(unit).effects,
      rebuild: rebuild
    })
    // Object.defineProperty(action, 'effects', { get () { return NATLOG.effectFind(action.unit).effects } })
    // Object.defineProperty(action, 'targRules', { get () { return NATLOG.effectFind(action.unit).targRules } })
    // return action
  }
}

export default STORMCLOUD
