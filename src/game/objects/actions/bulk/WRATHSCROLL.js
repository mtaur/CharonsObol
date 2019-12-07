import { Action } from '../Action.js'

class WRATHSCROLL {
  static NAME = 'WRATHSCROLL'
  static filename = 'WRATHSCROLL'
  static isConsumable = true

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'WRATHSCROLL',
      // filename: 'LUNGE',
      name: 'Wrath',
      type: 'both',
      // cost: 2,
      isConsumable: true,
      SPCost: 6,
      desc: `Target enemy who still has both actions takes (MELEE + MAGIC + RANGED + 4x INIT) ` +
        `damage. Refunds your turn, but delays your team's next action by an additional turn gauge. ` +
        `DRED and DREF scaling are both 2.`,
      // targetRules: ['HOMING', 'ALLYNOTGUARDINGNOTSELF', 'SELF'],
      // targetRules: ['ENEMYHASACTBOTH', 'SELF', 'SELF'],
      targetRules: ['ENEMYHASACTBOTH', 'SELF'],
      prereqs: [], // TargetRules.LIB.BACK ...
      // after: [{
      //   NAME: 'ROWFRONT'
      // }],
      // after: [{
      //   // NAME: 'CASTERBACK'
      // }],
      useInitPoints: false,
      useActionPoints: false,
      effects: [
        {
          NAME: 'DAMAGE',
          name: 'damage',
          scale: {
            MAGIC: 1,
            MELEE: 1,
            RANGED: 1,
            INIT: 4
          },
          DREDScale: 2,
          DREFScale: 2
        },
        // {
        //   NAME: 'INSPIRE',
        //   name: 'inspire',
        //   major: true,
        //   minor: true
        // },
        {
          NAME: 'ALERT',
          name: 'alert',
          alertFrac: -1.0
        } // ,
        // {
        //   NAME: 'ROWBACK',
        //   name: 'rowback'
        // }
      ]
    })
  }
}

export default WRATHSCROLL
