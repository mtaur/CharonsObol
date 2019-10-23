import { Action } from '../Action.js'

class MOVEBACK {
  static NAME = 'MOVEBACK'
  static filename = 'MOVEBACK'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MOVEBACK',
      // filename: 'MOVE',
      name: 'Move back',
      type: 'minor',
      desc: 'Move to the back row.',
      targetRules: ['SELF'],
      prereqs: ['BACKNOTFULL', 'FRONT'],
      effects: [
        {
          NAME: 'ROWSWAP',
          name: 'rowSwap'
        }
      ]
    })
  }
}

export default MOVEBACK
