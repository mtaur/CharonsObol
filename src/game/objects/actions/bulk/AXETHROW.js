import { Action } from '../Action.js'

class AXETHROW {
  static NAME = 'AXETHROW'
  static filename = 'AXETHROW'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'AXETHROW',
      // filename: 'RANGED',
      name: 'Throw Axe',
      type: 'both',
      desc: `Basic ranged attack. Deals damage equal to the AVERAGE of MELEE ` +
        `and RANGED.`,
      targetRules: ['RANGED'],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            RANGED: 0.5,
            MELEE: 0.5
          },
          DREDScale: 1,
          DREFScale: 1
        }
      ]
    })
  }
}

export default AXETHROW
