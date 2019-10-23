import { Action } from '../Action.js'

class MOVEFRONT {
  static NAME = 'MOVEFRONT'
  static filename = 'MOVEFRONT'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MOVEFRONT',
      // filename: 'MOVE',
      name: 'Move front',
      type: 'minor',
      desc: 'Move to the front row.',
      targetRules: ['SELF'],
      prereqs: ['BACK', 'FRONTNOTFULL'],
      effects: [
        {
          NAME: 'ROWSWAP',
          name: 'rowSwap'
        }
      ]
    })
  }
}

export default MOVEFRONT
