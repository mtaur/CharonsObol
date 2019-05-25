import { Action } from '../Action.js'

class RANGED {
  static NAME = 'RANGED'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RANGED',
      name: 'Ranged',
      type: 'major',
      desc: 'Basic ranged attack. Can target back row UNLESS a unit in the front row has GUARD activated.',
      targetRules: ['RANGED']
    })
  }
}

export default RANGED
