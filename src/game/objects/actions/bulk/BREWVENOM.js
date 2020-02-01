import { Action } from '../Action.js'

class BREWVENOM {
  static NAME = 'BREWVENOM'
  static filename = 'BREWVENOM'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'BREWVENOM',
      // filename: 'INSPIRE',
      name: 'Brew Ratslime Venom',
      type: 'minor',
      desc: `A patented venom of Ratslime fangs.  Harms enemies and friends alike.`,
      // cost: 1,
      essenceCostScale: 1,
      targetRules: ['SELF'],
      // useInitPoints: false,
      // useActionPoints: false,
      effects: [
        {
          NAME: 'BREWVENOM',
          name: 'brewvenom'
        }
      ]
    })
  }
}

export default BREWVENOM
