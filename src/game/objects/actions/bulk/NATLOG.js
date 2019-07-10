import { TargetRule } from '../targetRules/TargetRule.js'
import { Action } from '../Action.js'
import { Unit } from '../../units/Unit.js'

class NATLOG {
  static NAME = 'NATLOG'
  static filename = 'NATLOG'
  // static effectFind = function (unit = null) {
  //   let length = unit.side === Unit.SIDE.PLAYER ? unit.cpuTeam.field.length : unit.playerTeam.field.length
  //   let targRules = []
  //   let effects = []
  //   for (let j = 0; j < length; j++) {
  //     targRules.push('NATLOG')
  //     effects.push({
  //       NAME: 'DAMAGE',
  //       name: 'damage',
  //       scale: {
  //         MAGIC: 1 / (j + 1)
  //       },
  //       DREDScale: 1 / (j + 1),
  //       DREFScale: 1 / (j + 1)
  //     })
  //   }
  //   return { effects: effects, targRules: targRules }
  // }

  constructor (unit = null) {
    let computeProps = function (input) {
      let length = input.side === Unit.SIDE.PLAYER ? input.cpuTeam.field.length : input.playerTeam.field.length
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
      NAME: 'NATLOG',
      filename: 'NATLOG',
      name: 'Natural Log',
      type: 'major',
      desc: 'A vengeful bouncing log deals 1xMAGIC damage to a chosen enemy, (1/2)xMAGIC damage to a second, (1/3)xMAGIC damage to a third, and so on until no more targets are available.',
      cost: 2,
      targetRules: computeProps(unit).targRules,
      effects: computeProps(unit).effects,
      rebuild: rebuild
    })
    // Object.defineProperty(action, 'effects', { get () { return NATLOG.effectFind(action.unit).effects } })
    // Object.defineProperty(action, 'targRules', { get () { return NATLOG.effectFind(action.unit).targRules } })
    // return action
  }
}

export default NATLOG
