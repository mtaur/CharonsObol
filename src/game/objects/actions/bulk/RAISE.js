import { Action } from '../Action.js'

class RAISE {
  static NAME = 'RAISE'
  static filename = 'RAISE'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RAISE',
      name: 'Raise Zombie',
      type: 'both',
      desc: `Raise a zombie of Caenenfoeder.  Comes with its own SP supply! ` +
        `Non-transerable, initiative not included.`,
      cost: 3,
      useInitPoints: false,
      useActionPoints: true,
      targetRules: ['SELF'],
      prereqs: ['OTHERROWNOTFULL', 'BACK'],
      effects: [
        {
          NAME: 'RAISE',
          name: 'Raise Zombie'
        }
      ]
    })
  }
}

export default RAISE
