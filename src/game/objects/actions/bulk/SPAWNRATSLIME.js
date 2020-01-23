import { Action } from '../Action.js'

class SPAWNRATSLIME {
  static NAME = 'SPAWNRATSLIME'
  static filename = 'SPAWNRATSLIME'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'SPAWNRATSLIME',
      name: 'Spawn ratslime',
      type: 'both',
      desc: `Spawn a ratslime minion.`,
      cost: 5,
      // useInitPoints: false,
      // useActionPoints: true,
      targetRules: ['SELF'],
      prereqs: ['OTHERROWNOTFULL', 'BACK'],
      effects: [
        {
          NAME: 'SPAWNRATSLIME',
          name: 'Spawn ratslime'
        }
      ]
    })
  }
}

export default SPAWNRATSLIME
