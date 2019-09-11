import { Action } from '../Action.js'

class FLAMEFISTSCROLL {
  static NAME = 'FLAMEFISTSCROLL'
  static filename = 'FLAMEFISTSCROLL'
  static isConsumable = true

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'FLAMEFISTSCROLL',
      // filename: 'FLAMEFIST',
      name: 'Fiery Verdict',
      type: 'major',
      desc: 'Deal (MELEE + MAGIC + RANGED + 2x INIT) damage with a melee attack. ' +
        'DRED and DREF scaling are both 2.',
      isConsumable: true,
      SPCost: 4,
      // cost: 2,
      targetRules: ['MELEE'],
      prereqs: ['FRONTNOTFULL'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1,
            MELEE: 1,
            RANGED: 1,
            INIT: 2
          },
          DREDScale: 2,
          DREFScale: 2
        }
      ]
    })
  }
}

export default FLAMEFISTSCROLL
