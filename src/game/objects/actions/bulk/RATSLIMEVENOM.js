import { Action } from '../Action.js'

class RATSLIMEVENOM {
  static NAME = 'RATSLIMEVENOM'
  static filename = 'RATSLIMEVENOM'
  static isConsumable = true
  static isTransient = true

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RATSLIMEVENOM',
      // filename: 'GUARD',
      name: 'Ratslime venom',
      type: 'both',
      desc: `Deal 100% bonus damage as poison (also to yourself).`,
      // cost: 1,
      // useInitPoints: false,
      // useActionPoints: false,
      isConsumable: true,
      isTransient: true,
      SPCost: 0,
      targetRules: ['RATSLIMEVENOM'],
      effects: [
        {
          NAME: 'RATSLIMEVENOM',
          name: 'ratslimevenom'
        }
      ]
    })
  }
}

export default RATSLIMEVENOM
