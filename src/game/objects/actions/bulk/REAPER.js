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
      cost: 2,
      desc: 'Deals 2.5x MAGIC damage to an enemy who has at most this much health. ' +
        '(may fail to kill if damage is converted to poison, etc.)',
      targetRules: ['REAPER'],
      // prereqs: [],
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            min: {
              MAGIC: 2.5
            }
          },
          DREDScale: 0,
          DREFScale: 0
        }
      ]
    })
  }
}

export default REAPER
