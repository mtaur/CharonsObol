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
      desc: 'Restores a friendly unit\'s major action. Gain TWO gauges worth ' +
        'of Turn Points.',
      cost: 1,
      targetRules: ['INSPIRE', 'SELF'],
      useInitPoints: false,
      effects: [
        {
          NAME: 'INSPIRE',
          name: 'inspire',
          major: true,
          minor: false
        },
        {
          NAME: 'ALERT',
          name: 'alert',
          alertFrac: 2
        }
      ]
    })
  }
}

export default INSPIRE
