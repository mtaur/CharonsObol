import { Action } from '../Action.js'

class BREWOIL {
  static NAME = 'BREWOIL'
  static filename = 'BREWOIL'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'BREWOIL',
      // filename: 'INSPIRE',
      name: 'Brew Ratslime Oil',
      type: 'minor',
      desc: `A patented elixir of Ratslime oil.  Side effects include acute toxosis.`,
      // cost: 1,
      essenceCostScale: 1,
      targetRules: ['SELF'],
      // useInitPoints: false,
      // useActionPoints: false,
      effects: [
        {
          NAME: 'BREWOIL',
          name: 'brewoil'
        }
      ]
    })
  }
}

export default BREWOIL
