import { Action } from '../Action.js'

class SPARKLE {
  static NAME = 'SPARKLE'
  static filename = 'SPARKLE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'SPARKLE',
      // filename: 'HEAL',
      name: 'Sparkle',
      type: 'minor',
      desc: 'Heal self for 0.25x MAGIC HP',
      // cost: 1,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            MAGIC: 0.25
          }
        }
      ]
    })
  }
}

export default SPARKLE
