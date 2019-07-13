import { Action } from '../Action.js'

class REBUKE {
  static NAME = 'REBUKE'
  static filename = 'REBUKE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'REBUKE',
      // filename: 'MELEE',
      name: 'Rebuke',
      type: 'both',
      desc: 'Basic melee attack which also must target front row. Knocks the target to the back row. Deals MELEE + DRED + DREF damage to the target.',
      targetRules: ['REBUKE', 'SAME'],
      prereqs: ['FRONTNOTFULL'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 1,
            DRED: 1,
            DREF: 1
          },
          DREDScale: 1.5,
          DREFScale: 1.5
        },
        {
          NAME: 'ROWBACK',
          name: 'rowBack'
        }
      ]
    })
  }
}

export default REBUKE
