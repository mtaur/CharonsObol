import { Action } from '../Action.js'

class MANAPOT {
  static NAME = 'MANAPOT'
  static filename = 'MANAPOT'
  static isConsumable = true

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MANAPOT',
      // filename: 'HEAL',
      name: 'Mana Potion',
      type: 'minor',
      desc: 'Restore 2 MP.',
      // cost: 1,
      isConsumable: true,
      SPCost: 2,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'MANAGAIN',
          name: 'managain',
          value: 2
        }
      ]
    })
  }
}

export default MANAPOT
