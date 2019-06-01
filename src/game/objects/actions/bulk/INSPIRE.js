import { Action } from '../Action.js'

class INSPIRE {
  static NAME = 'INSPIRE'

  // { name: 'melee', type: 'major', desc: 'Basic malee attack. Must target front row if possible.' },
  // { name: 'ranged', type: 'major', desc: 'Basic ranged attack. Can target back row UNLESS a unit in the front row has GUARD activated.' },
  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  // { name: 'run', type: 'minor', desc: 'Run away!' }
  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'INSPIRE',
      name: 'Inspire',
      type: 'major',
      desc: 'Restores a friendly unit\'s major action.',
      cost: 1,
      targetRules: ['INSPIRE'],
      effects: [{
        NAME: 'INSPIRE',
        name: 'inspire',
        major: true,
        minor: false
      }]
    })
  }
}

export default INSPIRE
