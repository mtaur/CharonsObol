import { Action } from '../Action.js'

class RUN {
  static NAME = 'RUN'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'RUN',
      name: 'Run away',
      type: 'minor',
      desc: 'Run away!',
      targetRules: ['SELF'],
      effects: [
        {
          NAME: 'RUN',
          name: 'run'
        }
      ]
    })
  }
}

export default RUN
