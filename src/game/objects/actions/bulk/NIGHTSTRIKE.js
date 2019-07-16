import { Action } from '../Action.js'

class NIGHTSTRIKE {
  static NAME = 'NIGHTSTRIKE'
  static filename = 'NIGHTSTRIKE'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'NIGHTSTRIKE',
      // filename: 'LUNGE',
      name: 'Night Strike',
      type: 'both',
      desc: `Deal the average of MELEE, RANGED, and MAGIC as damage to any enemy, bypassing DRED and DREF. Activate Guard for a non-guarding ally (not yourself) and then move to back row.`,
      // targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF', 'SELF'],
      targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF'],
      prereqs: ['FRONT'], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      after: [{
        NAME: 'CASTERBACK'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 0.3334,
            RANGED: 0.3334,
            MAGIC: 0.3334
          },
          DREDScale: 0,
          DREFScale: 0
        },
        {
          NAME: 'GUARD',
          name: 'guard'
        } // ,
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default NIGHTSTRIKE
