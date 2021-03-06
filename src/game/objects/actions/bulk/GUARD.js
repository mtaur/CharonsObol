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
      desc: `Sets GUARD status for this unit. +100% DRED and DREF base scaling. ` +
        `Unit takes target priority for Ranged and Melee ` +
        `attacks. Deactived upon dealing or receiving damage.`,
      targetRules: ['GUARD'],
      effects: [
        {
          NAME: 'GUARD',
          name: 'guard'
        }
      ]
    })
  }
}

export default GUARD
