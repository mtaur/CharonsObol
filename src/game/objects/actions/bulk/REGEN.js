import { Action } from '../Action.js'

class REGEN {
  static NAME = 'REGEN'
  static filename = 'REGEN'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'REGEN',
      // filename: 'MELEE',
      name: 'Regenerate',
      type: 'both',
      desc: `Gradually restores 2x MAGIC health to a friendly taget. Stacks with ` +
        `other regeneration or poison effects.`,
      cost: 1,
      targetRules: ['ALLY'],
      // prereqs: ['OTHERROWNOTFULL'],
      // after: [{
      //   NAME: 'CASTERROWSWAP'
      // }],
      effects: [
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            MAGIC: 2
          },
          virulence: 0.1
        }
      ]
    })
  }
}

export default REGEN
