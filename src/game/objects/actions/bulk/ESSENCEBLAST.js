import { Action } from '../Action.js'

class ESSENCEBLAST {
  static NAME = 'ESSENCEBLAST'
  static filename = 'ESSENCEBLAST'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'ESSENCEBLAST',
      // filename: 'MELEE',
      name: 'Essence Blast',
      type: 'both',
      desc: `Deals 2.5x MAGIC damage to an enemy at random. ` +
        `Bypasses DRED and DREF. Costs ESSENCE equal to total SP.`,
      targetRules: ['STORMCLOUDBOLT'],
      prereqs: [],
      after: [],
      essenceCostScale: 1,
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 2.5
          },
          DREDScale: 0,
          DREFScale: 0
        }
      ]
    })
  }
}

export default ESSENCEBLAST
