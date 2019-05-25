import { Action } from '../Action.js'

class HEAL {
  static NAME = 'HEAL'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'HEAL',
      name: 'Heal',
      type: 'minor',
      desc: 'Heal one ally for 1x MAGIC HP',
      cost: 1,
      targetRules: ['ALLY']
    })
  }
}

export default HEAL
