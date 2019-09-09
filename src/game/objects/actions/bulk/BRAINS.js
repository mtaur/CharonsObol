import { Action } from '../Action.js'

class BRAINS {
  static NAME = 'BRAINS'
  static filename = 'BRAINS'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'BRAINS',
      // filename: 'MELEE',
      name: 'Brains',
      type: 'both',
      cost: 1,
      desc: `Nothing hits the spot quite like brains.  Recover health equal to ` +
        `100% of your total poison amount, but increase poison level by 50%.`,
      targetRules: ['SELF', 'SELF'],
      prereqs: ['LOSINGHP'],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            // MELEE: 0.5
          },
          poisonScale: 1.0 // 0.5
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            // MAGIC: 2
          },
          poisonScale: -0.5, // -0.25,
          virulence: 0.1
        }
      ]
    })
  }
}

export default BRAINS
