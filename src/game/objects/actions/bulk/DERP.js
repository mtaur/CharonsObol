import { Action } from '../Action.js'

class DERP {
  static NAME = 'DERP'
  static filename = 'DERP'

  constructor (unit = null) {
    return new Action({
      unit: unit // ,
      // filename: 'DERP'
    })
  }
}

export default DERP
