import { Action } from '../Action.js'

class PECK {
  static NAME = 'PECK'
  static filename = 'PECK'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'PECK',
      // filename: 'MELEE',
      name: 'Peck',
      type: 'minor',
      desc: `Basic melee attack that uses a minor action point and deals 1/3 MELEE ` +
        `damage.`,
      targetRules: ['MELEE'],
      // isConsumable: true,
      prereqs: ['FRONTNOTFULL'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 0.333
          },
          DREDScale: 0.333,
          DREFScale: 0.333
        }
      ]
    })
  }
}

export default PECK
