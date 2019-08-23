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
      desc: 'Heal self for 1x (MAGIC + MELEE + RANGED) HP.',
      cost: 2,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            MAGIC: 1,
            MELEE: 1,
            RANGED: 1
          }
        }
      ]
    })
  }
}

export default TAURVESTMANA
