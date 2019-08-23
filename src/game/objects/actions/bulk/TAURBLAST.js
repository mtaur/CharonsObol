import { Action } from '../Action.js'

class TAURBLAST {
  static NAME = 'TAURBLAST'
  static filename = 'TAURBLAST'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'TAURBLAST',
      // filename: 'MELEE',
      name: 'Taurblast',
      type: 'both',
      desc: `Deals 1x MAGIC damage to an enemy at random. ` +
        `Bypasses DRED and DREF.`,
      targetRules: ['STORMCLOUDBOLT'],
      prereqs: [],
      after: [],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1.0
          },
          DREDScale: 0,
          DREFScale: 0
        }
      ]
    })
  }
}

export default TAURBLAST
