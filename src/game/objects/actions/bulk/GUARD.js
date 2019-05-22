import { Action } from '../Action.js'

class GUARD {
  static NAME = 'GUARD'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor () {
    return new Action({
      NAME: 'GUARD',
      name: 'Guard',
      type: 'minor',
      desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.',
      targetRules: []
    })
  }
}

export default GUARD
