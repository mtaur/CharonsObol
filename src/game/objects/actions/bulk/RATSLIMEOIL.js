import { Action } from '../Action.js'

class RATSLIMEOIL {
  static NAME = 'RATSLIMEOIL'
  static filename = 'RATSLIMEOIL'
  static isConsumable = true
  static isTransient = true

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RATSLIMEOIL',
      // filename: 'HEAL',
      name: 'Ratslime Oil',
      type: 'minor',
      desc: 'Heal self for 50% max HP. Poison self for half that amount.',
      // cost: 1,
      isConsumable: true,
      isTransient: true,
      SPCost: 5,
      targetRules: ['SELF', 'SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            HP: 0.5
          }
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            HP: -0.25
          }
        }
      ]
    })
  }
}

export default RATSLIMEOIL
