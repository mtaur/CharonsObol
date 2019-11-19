import { Action } from '../Action.js'

class ARCANESIGHT {
  static NAME = 'ARCANESIGHT'
  static filename = 'ARCANESIGHT'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'ARCANESIGHT',
      // filename: 'GUARD',
      name: 'Arcane Sight',
      type: 'minor',
      desc: `Adds 50% MAGIC scaling to RANGED and vice-versa until unit deals damage ` +
        `or battle ends.  Refunds action point.`,
      cost: 1,
      // useInitPoints: false,
      useActionPoints: false,
      targetRules: ['ARCANESIGHT'],
      effects: [
        {
          NAME: 'ARCANESIGHT',
          name: 'Arcane Sight'
        }
      ]
    })
  }
}

export default ARCANESIGHT
