import { Action } from '../Action.js'

class LUNGE {
  static NAME = 'LUNGE'

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor () {
    return new Action({
      NAME: 'LUNGE',
      name: 'Lunge',
      type: 'major',
      desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.',
      targetRules: []
    })
  }
}

export default LUNGE
