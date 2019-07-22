import { Action } from '../Action.js'

class ALERT {
  static NAME = 'ALERT'
  static filename = 'ALERT'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'ALERT',
      // filename: 'MELEE',
      name: 'Alert',
      type: 'minor',
      desc: 'Set ally to GUARD state and gain half a Turn Point gauge.',
      targetRules: ['ALLYNOTGUARDINGNOTSELF', 'SELF'],
      // prereqs: ['FRONTNOTFULL'],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'GUARD',
          name: 'guard'
        },
        {
          NAME: 'ALERT',
          name: 'alert',
          alertFrac: 0.5
        }
      ]
    })
  }
}

export default ALERT
