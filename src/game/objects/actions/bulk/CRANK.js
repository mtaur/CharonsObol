import { Action } from '../Action.js'

class CRANK {
  static NAME = 'CRANK'
  static filename = 'CRANK'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'CRANK',
      // filename: 'GUARD',
      name: 'Crank',
      type: 'both',
      desc: `Crank the arbalest to get a 75% bonus to TOTAL RANGED stat.`,
      // cost: 1,
      // useInitPoints: false,
      // useActionPoints: false,
      targetRules: ['CRANK'],
      effects: [
        {
          NAME: 'CRANK',
          name: 'Crank'
        }
      ]
    })
  }
}

export default CRANK
