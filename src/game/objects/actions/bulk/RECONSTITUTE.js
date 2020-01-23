import { Action } from '../Action.js'

class RECONSTITUTE {
  static NAME = 'RECONSTITUTE'
  static filename = 'RECONSTITUTE'
  // static isConsumable = true
  // static isTransient = true

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RECONSTITUTE',
      // filename: 'HEAL',
      name: 'Fester',
      type: 'both',
      desc: 'Heal self for 25 points and 25% of current POISON, but increase current POISON by 25% and .' +
        '25 additional points.', // +
      // `Must have at least 100 POISON to use.`,
      cost: 0,
      // isConsumable: true,
      // isTransient: true,
      // SPCost: 5,
      prereqs: ['NOTLOSINGHP100'],
      targetRules: ['SELF', 'SELF'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            // MELEE: 0.5
          },
          poisonScale: 0.25,
          flat: 25
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            // HP: -0.25
          },
          poisonScale: -0.25,
          virulence: 0.1,
          flat: -25
        }
      ]
    })
  }
}

export default RECONSTITUTE
