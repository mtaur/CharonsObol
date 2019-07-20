import { Action } from '../Action.js'

class RESTMINOR {
  static NAME = 'RESTMINOR'
  static filename = 'RESTMINOR'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RESTMINOR',
      // filename: 'MELEE',
      name: 'Minor rest',
      type: 'minor',
      desc: 'Gradually restores health to caster. Stacks with other regeneration or poison effects.',
      // cost: 0,
      targetRules: ['SELF'],
      // prereqs: ['OTHERROWNOTFULL'],
      // after: [{
      //   NAME: 'CASTERROWSWAP'
      // }],
      effects: [
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            HP: 0.05
            // MAGIC: 2
          },
          virulence: 0.1
        }
      ]
    })
  }
}

export default RESTMINOR
