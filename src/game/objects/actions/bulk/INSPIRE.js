import { Action } from '../Action.js'

class INSPIRE {
  static NAME = 'INSPIRE'
  static filename = 'INSPIRE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'INSPIRE',
      // filename: 'INSPIRE',
      name: 'Inspire',
      type: 'major',
      desc: 'Restores a friendly unit\'s major action.',
      cost: 1,
      targetRules: ['INSPIRE'],
      effects: [{
        NAME: 'INSPIRE',
        name: 'inspire',
        major: true,
        minor: false
      }]
    })
  }
}

export default INSPIRE
