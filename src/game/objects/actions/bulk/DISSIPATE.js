import { Action } from '../Action.js'

class DISSIPATE {
  static NAME = 'DISSIPATE'
  static filename = 'DISSIPATE'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'DISSIPATE',
      // filename: 'LUNGE',
      name: 'Dissipate',
      type: 'both',
      // cost: 1,
      // cost: 3,
      desc: `Heal all allies equally, damaging self by the total amount. Cannot spend ` +
        `more than 50% of current health this way.`,
      targetRules: ['SELF'],
      // prereqs: ['FRONTNOTFULL'],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'DISSIPATE',
          name: 'dissipate'
        }
      ]
    })
  }
}

export default DISSIPATE
