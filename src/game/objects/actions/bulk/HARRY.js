import { Action } from '../Action.js'

class HARRY {
  static NAME = 'HARRY'
  static filename = 'HARRY'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HARRY',
      name: 'Harry',
      type: 'minor',
      desc: `Wizard or not, you can use a minor action point to perform a lesser ` +
        `ranged attack from the front row, dealing damage equal to 0.35x the lesser ` +
        `of RANGED and MELEE.`,
      targetRules: ['RANGED'],
      prereqs: ['FRONT'],
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   NAME: 'ROWSWAP'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            min: {
              MELEE: 0.35,
              RANGED: 0.35
            }
          },
          DREDScale: 0.35,
          DREFScale: 0.35
        }
      ]
    })
  }
}

export default HARRY
