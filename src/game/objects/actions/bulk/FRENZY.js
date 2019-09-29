import { Action } from '../Action.js'

class FRENZY {
  static NAME = 'FRENZY'
  static filename = 'FRENZY'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'FRENZY',
      // filename: 'LUNGE',
      name: 'Blood Frenzy',
      type: 'both',
      cost: 1,
      desc: `Attack an enemy for 1x (MELEE + MAGIC) damage. Steal major and minor ` +
        `action point from ally or allies. Attack bypasses DREF.`,
      // targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF', 'SELF'],
      targetRules: ['MELEE', 'ALLYNOTSELFHASACTMAJOR', 'ALLYNOTSELFHASACTMINOR', 'SELF'],
      prereqs: ['FRONTNOTFULL'], // TargetRules.LIB.BACK ...
      useInitPoints: false, // Spends init points by stealing actions!!
      useActionPoints: false,
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 1,
            MAGIC: 1
          },
          DREDScale: 2,
          DREFScale: 0 // 2
        }, // ,
        {
          NAME: 'LOSEACTMAJOR',
          name: 'loseactmajor'
        },
        {
          NAME: 'LOSEACTMINOR',
          name: 'loseactminor'
        } // ,
        // {
        //   NAME: 'INSPIRE',
        //   name: 'inspire',
        //   major: true,
        //   minor: true
        // }
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default FRENZY
