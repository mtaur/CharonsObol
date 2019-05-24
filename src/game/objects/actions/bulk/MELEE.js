import { Action } from '../Action.js'

class MELEE {
  static NAME = 'MELEE'

  constructor () {
    return new Action({
      NAME: 'MELEE',
      name: 'Melee',
      type: 'major',
      desc: 'Basic melee attack. Must target front row if possible. Move to front row if not already there.',
      targetRules: ['MELEE']
    })
  }
}

export default MELEE
