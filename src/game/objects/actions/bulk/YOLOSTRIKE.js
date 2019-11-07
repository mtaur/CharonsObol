import { Action } from '../Action.js'

class YOLOSTRIKE {
  static NAME = 'YOLOSTRIKE'
  static filename = 'YOLOSTRIKE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'YOLOSTRIKE',
      // filename: 'MELEE',
      name: 'YOLO Strike',
      type: 'both',
      desc: `Basic melee attack dealing 1x MELEE damage with 1.5x DREF scaling ` +
        `and 0.5x DRED scaling.`,
      targetRules: ['MELEE'],
      prereqs: ['FRONT'],
      after: [{
        NAME: 'CASTERFRONT'
      }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 1
          },
          DREDScale: 0.5,
          DREFScale: 1.5
        }
      ]
    })
  }
}

export default YOLOSTRIKE
