import { Action } from '../Action.js'

class NIRVANA {
  static NAME = 'NIRVANA'
  static filename = 'NIRVANA'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'NIRVANA',
      // filename: 'LUNGE',
      name: 'Nirvana',
      type: 'both',
      cost: 2,
      desc: `Target enemy takes 2x MAGIC damage and loses Major action point.`,
      // targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF', 'SELF'],
      targetRules: ['ENEMYHASACTMAJOR', 'SAME'],
      prereqs: [], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   // NAME: 'CASTERBACK'
      // }],
      effects: [
        {
          NAME: 'LOSEACTMAJOR',
          name: 'loseactmajor'
        },
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 2
          },
          DREDScale: 2,
          DREFScale: 2
        } // ,
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default NIRVANA
