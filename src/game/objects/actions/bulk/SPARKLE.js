import { Action } from '../Action.js'

class SPARKLE {
  static NAME = 'SPARKLE'
  static filename = 'SPARKLE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HEAL',
      // filename: 'HEAL',
      name: 'Heal',
      type: 'minor',
      desc: 'Heal self for 0.35x MAGIC HP',
      // cost: 1,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            MAGIC: 0.35
          }
        }
      ]
    })
  }
}

export default SPARKLE
