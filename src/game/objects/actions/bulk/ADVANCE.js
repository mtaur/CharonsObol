import { Action } from '../Action.js'

class ADVANCE {
  static NAME = 'ADVANCE'
  static filename = 'ADVANCE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'ADVANCE',
      // filename: 'MELEE',
      name: 'Advance',
      type: 'both',
      desc: `Basic melee attack which deals DRED + DREF damage to the target, ` +
        `bypassing DRED and DREF. Caster activates Guard.`,
      targetRules: ['MELEE', 'SELF'],
      prereqs: ['FRONTNOTFULL'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            DRED: 1,
            DREF: 1
          },
          DREDScale: 0,
          DREFScale: 0
        },
        {
          NAME: 'GUARD',
          name: 'guard'
        }
      ]
    })
  }
}

export default ADVANCE
