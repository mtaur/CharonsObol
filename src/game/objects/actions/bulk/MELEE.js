import { Action } from '../Action.js'

class MELEE {
  static NAME = 'MELEE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MELEE',
      name: 'Melee',
      type: 'major',
      desc: 'Basic melee attack. Must target front row if possible. Move to front row if not already there.',
      targetRules: ['MELEE'],
      after: [{
        NAME: 'ROWFRONT'
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
