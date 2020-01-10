import { Action } from '../Action.js'

class VOID {
  static NAME = 'VOID'
  static filename = 'VOID'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'VOID',
      // filename: 'LUNGE',
      name: 'Void',
      type: 'both', // major
      cost: 1,
      desc: 'Target steals HP from allies until fully healed or someone dies. Cannot ' +
        'be used on DECAYing minions.',
      targetRules: ['VOID'],
      // prereqs: [],
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      effects: [
        {
          NAME: 'VOID',
          name: 'void'
        }
      ]
    })
  }
}

export default VOID
