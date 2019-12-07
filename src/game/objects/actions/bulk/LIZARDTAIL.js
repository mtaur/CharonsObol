import { Action } from '../Action.js'

class LIZARDTAIL {
  static NAME = 'LIZARDTAIL'
  static filename = 'LIZARDTAIL'
  static isConsumable = true

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'LIZARDTAIL',
      // filename: 'HEAL',
      name: `Lizard's Tail`,
      type: 'minor',
      desc: 'Slowly regenerate 100% max HP',
      // cost: 1,
      isConsumable: true,
      SPCost: 5,
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            HP: 1
          },
          virulence: 0.025
        }
        // {
        //   NAME: 'HEAL',
        //   name: 'heal',
        //   scale: {
        //     HP: 0.3
        //   }
        // }
      ]
    })
  }
}

export default LIZARDTAIL
