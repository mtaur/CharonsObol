import { Action } from '../Action.js'

class RAINBOW {
  static NAME = 'RAINBOW'
  static filename = 'RAINBOW'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RAINBOW',
      // filename: 'LUNGE',
      name: 'Rainbow',
      type: 'major',
      desc: `Heals self for 1.0x MAGIC and restores your minor action point and an .` +
        `initiative token.`,
      cost: 1,
      targetRules: ['SELFNOMINOR', 'SELF', 'SELF'],
      // prereqs: ['FRONTNOTFULL'], // ['FRONT'], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'INSPIRE',
          name: 'inspire',
          major: false,
          minor: true
        },
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            MAGIC: 1.0
          }
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

export default RAINBOW
