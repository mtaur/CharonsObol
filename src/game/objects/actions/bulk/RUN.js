import { Action } from '../Action.js'

class RUN {
  static NAME = 'RUN'

  constructor () {
    return new Action({
      NAME: 'RUN',
      name: 'Run away',
      type: 'minor',
      desc: 'Run away!',
      targetRules: ['SELF']
    })
  }
}

export default RUN
