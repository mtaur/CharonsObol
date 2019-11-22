import { Action } from '../Action.js'

class FERAL {
  static NAME = 'FERAL'
  static filename = 'FERAL'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'FERAL',
      // filename: 'GUARD',
      name: 'Feral Form',
      type: 'minor',
      desc: 'Increase MELEE and DREF, at the cost of MAGIC and RANGED.  Increase base ' +
        'HP multiplier by 0.15.',
      prereqs: ['NOTFERAL'],
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'FERAL',
          name: 'feral'
        }
      ]
    })
  }
}

export default FERAL
