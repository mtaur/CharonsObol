import { Action } from '../Action.js'

class RANGED {
  static NAME = 'RANGED'
  static filename = 'RANGED'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RANGED',
      // filename: 'RANGED',
      name: 'Ranged',
      type: 'major',
      desc: 'Basic ranged attack. Can target back row UNLESS a unit in the front row has GUARD activated.',
      targetRules: ['RANGED'],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            RANGED: 1
          },
          DREDScale: 1,
          DREFScale: 1
        }
      ]
    })
  }
}

export default RANGED
