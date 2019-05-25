import { Action } from '../Action.js'

class DERP {
  static NAME = 'DERP'

  constructor (unit = null) {
    return new Action({
      unit: unit
    })
  }
}

export default DERP
