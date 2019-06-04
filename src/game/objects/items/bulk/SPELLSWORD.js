import { Item } from '../Item.js'

// console.log(Soul)
class SPELLSWORD {
  static NAME = 'SPELLSWORD'
  static filename = 'SPELLSWORD'

  constructor () {
    return new Item({
      NAME: 'SPELLSWORD',
      name: 'Bastard Spellsword',
      cost: 8,
      desc: 'Use the average of MAGIC and MELEE in place of either stat when beneficial',
      tier: 'fine',
      // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
      replacements: [
        {
          statName: 'MELEE',
          value: function (unit) {
            return 0.5 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.MAGIC)
          }
        },
        {
          statName: 'MAGIC',
          value: function (unit) {
            return 0.5 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.MAGIC)
          }
        }
      ]
    })
  }
}
var obj = {
  filename: 'SPELLSWORD',
  exprt: SPELLSWORD
}
export default obj
// export default Spellsword
