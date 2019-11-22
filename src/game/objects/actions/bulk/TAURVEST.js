import { Action } from '../Action.js'

class TAURVEST {
  static NAME = 'TAURVEST'
  static filename = 'TAURVEST'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'TAURVEST',
      // filename: 'HEAL',
      name: 'Taurvest',
      type: 'both',
      desc: 'Heal self for 0.5x (MAGIC + MELEE + RANGED) HP, and activate ' +
        `guard.`,
      cost: 1,
      targetRules: ['TAURVEST', 'TAURVEST'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            MAGIC: 0.5,
            MELEE: 0.5,
            RANGED: 0.5
          }
        },
        {
          NAME: 'GUARD',
          name: 'guard'
        }
      ]
    })
  }
}

export default TAURVEST
