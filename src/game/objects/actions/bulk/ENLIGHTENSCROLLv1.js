import { Action } from '../Action.js'

class ENLIGHTENSCROLLv1 {
  static NAME = 'ENLIGHTENSCROLLv1'
  static filename = 'ENLIGHTENSCROLLv1'
  static isConsumable = true

  // { name: 'lunge', type: 'both', desc: 'Lunge FROM the back row TO the front row, doing 2x the SMALLER of MELEE and RANGED as damage to a target with a melee attack.' }
  constructor (unit = null) {
    return new Action({
      unit: unit,
      NAME: 'ENLIGHTENSCROLLv1',
      // filename: 'LUNGE',
      name: 'Enlightenv1',
      type: 'both',
      desc: `Take 1 MP from an ally who is not guarding. Heal it for ` +
        `1x MAGIC immediately and 3x MAGIC over time. Set Guard status on target.`, // +
      // `Refund your action points.`,
      isConsumable: true,
      include: false,
      SPCost: 3,
      targetRules: ['ENLIGHTENv1', 'SAME', 'SAME', 'SAME'],
      prereqs: ['MANANOTFULL'], // TargetRules.LIB.BACK ...
      // useInitPoints: false,
      // after: [{
      //   NAME: 'REFUNDBOTH'
      // }],
      // after: [{
      //   // NAME: 'CASTERBACK'
      // }],
      effects: [
        {
          NAME: 'MANASTEAL',
          name: 'manasteal',
          value: 1
        },
        {
          NAME: 'HEAL',
          name: 'heal',
          scale: {
            MAGIC: 1
          }
        },
        {
          NAME: 'HEALTHOVERTIME',
          name: 'healthovertime',
          scale: {
            MAGIC: 3
          },
          virulence: 0.05
        },
        {
          NAME: 'GUARD',
          name: 'guard'
        } // ,
        // {
        //   NAME: 'INSPIRE',
        //   name: 'inspire',
        //   major: true,
        //   minor: true
        // }
      ]
    })
  }
}

export default ENLIGHTENSCROLLv1
