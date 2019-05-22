import { Action } from '../Action.js'

class MOVE {
  static NAME = 'MOVE'

  constructor () {
    return new Action({
      NAME: 'MOVE',
      name: 'Move',
      type: 'minor',
      desc: 'Change rows.',
      targetRules: []
    })
  }
}

export default MOVE
