import { Action } from '../Action.js'

class DISILLUSION {
  static NAME = 'DISILLUSION'
  static filename = 'DISILLUSION'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'DISILLUSION',
      // filename: 'LUNGE',
      name: 'Disillusion',
      type: 'both',
      desc: `Deplete 1 MP from an ally. Deal 1x MAGIC damage to an enemy, bypassing ` +
        `DRED and DREF. That enemy loses their minor action point.`,
      // targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF', 'SELF'],
      targetRules: ['ALLYNOTSELFHASMANA1', 'ENEMYHASACTMINOR', 'SAME'],
      prereqs: [], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   // NAME: 'CASTERBACK'
      // }],
      effects: [
        {
          NAME: 'MANALOSE',
          name: 'manalose',
          value: 1
        },
        {
          NAME: 'LOSEACTMINOR',
          name: 'loseactminor'
        },
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1
          },
          DREDScale: 0,
          DREFScale: 0
        } // ,
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default DISILLUSION
