import { Action } from '../Action.js'

class HEAL {
  static NAME = 'HEAL'

  constructor () {
    return new Action({
      NAME: 'HEAL',
      name: 'Heal',
      type: 'minor',
      desc: 'Heal one ally for 1x MAGIC HP',
      cost: 1,
      targetRules: []
    })
  }
}

export default HEAL
