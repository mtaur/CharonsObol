import { Action } from '../Action.js'

class REPRISAL {
  static NAME = 'REPRISAL'
  static filename = 'REPRISAL'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'REPRISAL',
      // filename: 'MELEE',
      name: `You'll Understand When You're Older`,
      type: 'major',
      desc: 'Set ally or self to GUARD state and apply REPRISAL state for even more DREF.',
      targetRules: ['ALLYNOTGUARDING', 'SAME'],
      // prereqs: ['FRONTNOTFULL'],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'GUARD',
          name: 'guard'
        },
        {
          NAME: 'REPRISAL',
          name: 'reprisal'
        }
      ]
    })
  }
}

export default REPRISAL
