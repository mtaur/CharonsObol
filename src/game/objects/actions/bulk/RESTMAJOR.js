import { Action } from '../Action.js'

class RESTMAJOR {
  static NAME = 'RESTMAJOR'
  static filename = 'RESTMAJOR'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RESTMAJOR',
      // filename: 'HEAL',
      name: 'Major Rest',
      type: 'major',
      desc: 'Heal self for 5% of max HP',
      // cost: 1,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            HP: 0.05
            // MAGIC: 1
          }
        }
      ]
    })
  }
}

export default RESTMAJOR
