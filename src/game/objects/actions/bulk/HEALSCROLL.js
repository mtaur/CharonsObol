import { Action } from '../Action.js'

class HEALSCROLL {
  static NAME = 'HEALSCROLL'
  static filename = 'HEALSCROLL'
  static isConsumable = true

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HEALSCROLL',
      // filename: 'HEAL',
      name: 'Heal Scroll',
      type: 'major',
      desc: 'Heal one ally for 1.5x LARGEST between MELEE, RANGED, MAGIC, 5x INIT',
      isConsumable: true,
      SPCost: 3,
      targetRules: ['HEAL'],
      effects: [
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            max: {
              MELEE: 1.5,
              RANGED: 1.5,
              MAGIC: 1.5,
              INIT: 7.5
            }
          }
        }
      ]
    })
  }
}

export default HEALSCROLL
