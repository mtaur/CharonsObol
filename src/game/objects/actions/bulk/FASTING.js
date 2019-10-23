import { Action } from '../Action.js'

class FASTING {
  static NAME = 'FASTING'
  static filename = 'FASTING'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'FASTING',
      // filename: 'HEAL',
      name: 'Fasting',
      type: 'both',
      desc: 'Gain 1 MP and damage self for 0.25 x(MAGIC + MELEE + RANGED) HP.' +
        'Refunds turn guage.',
      // cost: 1,
      targetRules: ['SELF', 'SELF', 'SELF'],
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
        },
        {
          NAME: 'ALERT',
          name: 'alert',
          alertFrac: 2
        }
      ]
    })
  }
}

export default FASTING
