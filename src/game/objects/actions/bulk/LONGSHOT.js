import { Action } from '../Action.js'

class LONGSHOT {
  static NAME = 'LONGSHOT'
  static filename = 'LONGSHOT'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'LONGSHOT',
      // filename: 'RANGED',
      name: 'Long Shot',
      type: 'major',
      desc: `Cowardly ranged attack for 1x RANGED damage. 0x DREF and 2x DRED ` +
        'scaling.  Must be in the back row to use.',
      prereqs: ['BACK'],
      targetRules: ['RANGED'],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            RANGED: 1
          },
          DREDScale: 2,
          DREFScale: 0
        }
      ]
    })
  }
}

export default LONGSHOT
