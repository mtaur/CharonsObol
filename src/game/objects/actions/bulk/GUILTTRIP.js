import { Action } from '../Action.js'

class GUILTTRIP {
  static NAME = 'GUILTTRIP'
  static filename = 'GUILTTRIP'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'GUILTTRIP',
      // filename: 'LUNGE',
      name: 'Guilt Trip',
      type: 'minor',
      desc: `Steal 1 MP and drain 20% of your maximum health over time from an ally.`,
      // targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF', 'SELF'],
      targetRules: ['ALLYNOTSELFHASMANA1', 'SAME', 'SELF'],
      prereqs: ['MANANOTFULL'], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      after: [{
        // NAME: 'CASTERBACK'
      }],
      effects: [
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            HP: -0.2
          }
        },
        {
          NAME: 'MANASTEAL',
          name: 'manasteal',
          value: 1
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            HP: 0.2
          }
        } // ,
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default GUILTTRIP
