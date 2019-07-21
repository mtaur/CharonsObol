import { Action } from '../Action.js'

class MELEE {
  static NAME = 'MELEE'
  static filename = 'MELEE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MELEE',
      // filename: 'MELEE',
      name: 'Melee',
      type: 'major',
      desc: `Basic melee attack. Targets an enemy in the FRONT-MOST NON-EMPTY ` +
        `ROW. Must target a unit which is Guarding if possible. Move to front ` +
        `row if not already there.`,
      targetRules: ['MELEE'],
      prereqs: ['FRONTNOTFULL'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 1
          },
          DREDScale: 1,
          DREFScale: 1
        }
      ]
    })
  }
}

export default MELEE
