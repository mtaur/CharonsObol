import { Action } from '../Action.js'

class RESPITE {
  static NAME = 'RESPITE'
  static filename = 'RESPITE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RESPITE',
      // filename: 'MELEE',
      name: 'Respite',
      type: 'both',
      desc: `SWAP POSITIONS with a back-row ally.  That ally activates Guard. `,
      targetRules: ['SELF', 'ALLYBACK', 'SAME'],
      prereqs: ['FRONT'],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'ROWSWAP',
          name: 'rowswap'
        },
        {
          NAME: 'ROWSWAP',
          name: 'rowswap'
        },
        {
          NAME: 'GUARD',
          name: 'guard'
        }
      ]
    })
  }
}

export default RESPITE
