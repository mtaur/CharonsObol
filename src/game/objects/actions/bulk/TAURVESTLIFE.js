import { Action } from '../Action.js'

class TAURVESTLIFE {
  static NAME = 'TAURVESTLIFE'
  static filename = 'TAURVESTLIFE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'TAURVESTLIFE',
      // filename: 'HEAL',
      name: 'Taurvest Life',
      type: 'both',
      desc: 'Gain 1 MP and damage self for 0.25 x(MAGIC + MELEE + RANGED) HP.',
      // cost: 1,
      targetRules: ['SELF', 'SELF'],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 0.25,
            MELEE: 0.25,
            RANGED: 0.25
          },
          DREDScale: 0,
          DREFScale: 0
        },
        {
          NAME: 'MANAGAIN',
          name: 'managain',
          value: 1
        }
      ]
    })
  }
}

export default TAURVESTLIFE
