import { Action } from '../Action.js'

class WARBLE {
  static NAME = 'WARBLE'
  static filename = 'WARBLE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'WARBLE',
      // filename: 'INSPIRE',
      name: 'Warble',
      type: 'minor',
      desc: 'Regain major action point. Minor action point is spent, but two initiative tokens are ' +
        'granted to match new action point total.',
      cost: 1,
      targetRules: ['SELFNOMAJOR', 'SELF'],
      // useInitPoints: true,
      effects: [
        {
          NAME: 'INSPIRE',
          name: 'inspire',
          major: true,
          minor: false
        },
        {
          NAME: 'INITPUSH',
          name: 'initpush',
          times: 2
        }
      ]
    })
  }
}

export default WARBLE
