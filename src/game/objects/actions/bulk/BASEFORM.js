import { Action } from '../Action.js'

class BASEFORM {
  static NAME = 'BASEFORM'
  static filename = 'BASEFORM'

  // { name: 'guard', type: 'minor', desc: 'Doubles DRED, and prevents back row from being attacked by ranged attacks.  Deactived upon taking a hit or performing another action.' },
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'BASEFORM',
      // filename: 'GUARD',
      name: 'Base Form',
      type: 'minor',
      desc: 'Revert back to boring old Human form.',
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'BASEFORM',
          name: 'baseform'
        }
      ]
    })
  }
}

export default BASEFORM
