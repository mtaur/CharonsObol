import { Action } from '../Action.js'

class HEALTHPOT {
  static NAME = 'HEALTHPOT'
  static filename = 'HEALTHPOT'
  static isConsumable = true

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HEALTHPOT',
      // filename: 'HEAL',
      name: 'Health Potion',
      type: 'minor',
      desc: 'Heal self for 30% max HP.',
      // cost: 1,
      isConsumable: true,
      SPCost: 2,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            HP: 0.3
          }
        }
      ]
    })
  }
}

export default HEALTHPOT
