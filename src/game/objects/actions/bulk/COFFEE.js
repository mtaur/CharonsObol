import { Action } from '../Action.js'

class COFFEE {
  static NAME = 'COFFEE'
  static filename = 'COFFEE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'COFFEE',
      // filename: 'INSPIRE',
      name: 'Coffee',
      type: 'minor',
      desc: 'Gain TWO gauges worth of Turn Points. +1 Init for this battle.',
      cost: 1,
      targetRules: ['SELF', 'SELF'],
      // useInitPoints: false,
      // useActionPoints: false,
      effects: [
        {
          NAME: 'ALERT',
          name: 'alert',
          alertFrac: 2
        },
        {
          NAME: 'COFFEEBUFF',
          name: 'coffeebuff',
          caster: unit,
          target: unit
        }
      ]
    })
  }
}

export default COFFEE
