import { Action } from '../Action.js'

class DRYAD {
  static NAME = 'DRYAD'
  static filename = 'DRYAD'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'DRYAD',
      // filename: 'GUARD',
      name: 'Dryad Form',
      type: 'minor',
      desc: 'Increase MAGIC at the cost of MELEE and DRED',
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'DRYAD',
          name: 'dryad'
        }
      ]
    })
  }
}

export default DRYAD
