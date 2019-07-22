import { Action } from '../Action.js'

class BERSERK {
  static NAME = 'BERSERK'
  static filename = 'BERSERK'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'BERSERK',
      // filename: 'MELEE',
      name: 'Berserk',
      type: 'both',
      desc: `Basic melee attack against RANDOM legal target. 1.5x MELEE damage. ` +
        `Target only gets 1x DRED scaling, but 2x DREF scaling.`,
      targetRules: ['BERSERK'],
      prereqs: ['FRONTNOTFULL'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 1.5
          },
          DREDScale: 1,
          DREFScale: 2
        }
      ]
    })
  }
}

export default BERSERK
