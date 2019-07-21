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
      desc: `Basic ranged attack. Any unit who is GUARDING prevents enemy ` +
        `Ranged attacks from targetting any ally in the SAME ROW OR BEHIND.`,
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
