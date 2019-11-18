import { Action } from '../Action.js'

class SCRATCH {
  static NAME = 'SCRATCH'
  static filename = 'SCRATCH'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'SCRATCH',
      // filename: 'LUNGE',
      name: 'Scratch',
      type: 'major',
      desc: `Deals 1/2 MELEE damage and restores your minor action point and an .` +
        `initiative token.`,
      targetRules: ['SELFNOMINOR', 'MELEE', 'SELF'],
      prereqs: ['FRONTNOTFULL'], // ['FRONT'], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'INSPIRE',
          name: 'inspire',
          major: false,
          minor: true
        },
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 0.5
          },
          DREDScale: 0.5,
          DREFScale: 0.5
        },
        {
          NAME: 'INITPUSH',
          name: 'initpush',
          times: 1
        }
      ]
    })
  }
}

export default SCRATCH
