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
      desc: `Target enemy takes 1.5x MAGIC damage and loses Major action point. ` +
        `Bypasses DRED and DREF.`,
      targetRules: ['ENEMYHASACTMAJOR', 'SAME'],
      prereqs: [], // TargetRules.LIB.BACK ...
      effects: [
        {
          NAME: 'LOSEACTMAJOR',
          name: 'loseactmajor'
        },
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1.5
          },
          DREDScale: 0, // 1.5,
          DREFScale: 0 // 1.5
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
