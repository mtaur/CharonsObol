import { Action } from '../Action.js'

class CONTAGION {
  static NAME = 'CONTAGION'
  static filename = 'CONTAGION'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'CONTAGION',
      // filename: 'MELEE',
      name: 'Contagion',
      type: 'both',
      desc: `Basic melee attack dealing (1/2)x MELEE damage and transfering 10% of ` +
        `current poison total from self to target.`,
      targetRules: ['MELEE', 'SELF'],
      prereqs: ['FRONTNOTFULL', 'LOSINGHP'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 0.5
          },
          DREDScale: 1,
          DREFScale: 1,
          poisonScale: 0.1
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            // MAGIC: 2
          },
          poisonScale: 0.1,
          virulence: 0.1
        }
      ]
    })
  }
}

export default CONTAGION
