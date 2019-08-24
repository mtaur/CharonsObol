import { Action } from '../Action.js'

class TAURVESTMANA {
  static NAME = 'TAURVESTMANA'
  static filename = 'TAURVESTMANA'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'TAURVESTMANA',
      // filename: 'HEAL',
      name: 'Taurvest Mana',
      type: 'both',
      desc: 'Heal self for 0.5x (MAGIC + MELEE + RANGED) HP, and activate ' +
        `guard.`,
      cost: 1,
      targetRules: ['SELF', 'SELF'],
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

export default TAURVESTMANA
