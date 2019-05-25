import { Action } from '../Action.js'

class MOVE {
  static NAME = 'MOVE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'MOVE',
      name: 'Move',
      type: 'minor',
      desc: 'Change rows.',
      targetRules: ['SELF']
    })
  }
}

export default MOVE
