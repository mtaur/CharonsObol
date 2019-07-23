import { Action } from '../Action.js'

class SNIPE {
  static NAME = 'SNIPE'
  static filename = 'SNIPE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'SNIPE',
      // filename: 'RANGED',
      name: 'Snipe',
      type: 'both',
      desc: `Basic ranged attack. Bypass DRED and DREF.`,
      targetRules: ['RANGED'],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            RANGED: 1
          },
          DREDScale: 0,
          DREFScale: 0
        }
      ]
    })
  }
}

export default SNIPE
