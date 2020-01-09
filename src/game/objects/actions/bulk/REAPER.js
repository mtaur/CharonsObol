import { Action } from '../Action.js'

class REAPER {
  static NAME = 'REAPER'
  static filename = 'REAPER'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'REAPER',
      // filename: 'LUNGE',
      name: 'Reaper',
      type: 'both',
      cost: 3,
      desc: 'Melee attack which deals 1x (MAGIC + MELEE) damage to an enemy who has at ' +
        'most this much health, bypassing DRED and DREF. ' +
        '(May fail to kill enemy if damage is converted to poison, etc.)',
      targetRules: ['REAPER'],
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
            MELEE: 1
          },
          DREDScale: 0,
          DREFScale: 0
        }
      ]
    })
  }
}

export default REAPER
