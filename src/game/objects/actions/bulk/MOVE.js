import { Action } from '../Action.js'

class MOVE {
  static NAME = 'MOVE'
  static filename = 'MOVE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MOVE',
      // filename: 'MOVE',
      name: 'Move',
      type: 'minor',
      desc: 'Change rows.',
      targetRules: ['SELF'],
      prereqs: ['OTHERROWNOTFULL'],
      effects: [
        {
          NAME: 'ROWSWAP',
          name: 'rowSwap'
        }
      ]
    })
  }
}

export default MOVE
