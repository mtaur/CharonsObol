import { Item } from '../Item.js'

// console.log(Soul)
class ARBALEST {
  static NAME = 'ARBALEST'
  static filename = 'ARBALEST'

  constructor () {
    return new Item({
      NAME: 'ARBALEST',
      name: 'Arbalest',
      cost: 8,
      desc: 'Crank it for +30% TOTAL RANGED stat! (Seller not liable for 30% initiative loss.)',
      tier: 'fine',
      skills: ['CRANK'],
      converts: [
        { from: 'INIT', to: 'INIT', value: -0.3 }
      ]
      // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
      // replacements: [
      //   {
      //     statName: 'MELEE',
      //     value: function (unit) {
      //       return 0.5 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.MAGIC)
      //     }
      //   },
      //   {
      //     statName: 'MAGIC',
      //     value: function (unit) {
      //       return 0.5 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.MAGIC)
      //     }
      //   }
      // ]
    })
  }
}
var obj = {
  filename: 'ARBALEST',
  exprt: ARBALEST
}
export default obj
// export default Spellsword
