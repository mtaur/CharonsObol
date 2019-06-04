import { Action } from '../Action.js'

class GUARD {
  static NAME = 'GUARD'
  static filename = 'GUARD'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'GUARD',
      // filename: 'GUARD',
      name: 'Guard',
      type: 'minor',
      desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.',
      targetRules: ['SELF']
    })
  }
}

export default GUARD
