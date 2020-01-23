import { Action } from '../Action.js'

class BLIGHTMISSILE {
  static NAME = 'BLIGHTMISSILE'
  static filename = 'BLIGHTMISSILE'

  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'BLIGHTMISSILE',
      // filename: 'MELEE',
      name: 'Blight Missile',
      type: 'both',
      desc: `Ranged attack dealing damage equal to 35% of the unit's total POISON, ` +
        `as well as the average of MELEE, RANGED, and MAGIC.  Bypasses DRED and DREF. ` +
        `Remove 35% of POISON.  Must have 100 POISON or more to use.`,
      cost: 0,
      targetRules: ['RANGED', 'SELF'],
      prereqs: ['LOSINGHP100'],
      // after: [{
      //   NAME: 'CASTERFRONT'
      // }],
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MELEE: 0.33,
            RANGED: 0.33,
            MAGIC: 0.33
          },
          DREDScale: 0,
          DREFScale: 0,
          poisonScale: 0.35
          // virulence: 0.1
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            // HP: -0.25
          },
          poisonScale: 0.35,
          virulence: 0.1,
          flat: 10
        }
        // {
        //   NAME: 'HEALTHOVERTIME',
        //   name: 'healthovertime',
        //   scale: {
        //     // MAGIC: 2
        //   },
        //   poisonScale: 0.35,
        //   virulence: 0.1
      ]
    })
  }
}

export default BLIGHTMISSILE
