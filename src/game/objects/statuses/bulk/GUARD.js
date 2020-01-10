import { Status } from '../Status.js'

// console.log(Soul)
class GUARD {
  static NAME = 'GUARD'
  static filename = 'GUARD'

  constructor () {
    return new Status({
      NAME: 'GUARD',
      name: 'guard',
      desc: 'Increased TOTAL DRED and DREF stats by 100% until damage is dealt or received.' +
        'Interrupts targeting of melee or ranged skills.',
      remove: [
        'TAKEDAMAGE',
        'DAMAGE',
        'ENDBATTLE',
        'BEGINBATTLE'
      ],
      effects: [
        // { trigger: , effect: }
      ],
      bonus: [],
      // converts: [
      //   {
      //     from: 'DRED',
      //     to: 'DRED',
      //     value: 1
      //   },
      //   {
      //     from: 'DREF',
      //     to: 'DREF',
      //     value: 1
      //   }
      // ],
      replacements: [
        {
          statName: 'DRED',
          value: function (unit) {
            return 2 * unit.convertedStatValues.DRED
          }
        },
        {
          statName: 'DREF',
          value: function (unit) {
            return 2 * unit.convertedStatValues.DREF
          }
        }
      ]
    })
  }
}
var obj = {
  filename: 'GUARD',
  exprt: GUARD
}
export default obj
// export default Yolomace
