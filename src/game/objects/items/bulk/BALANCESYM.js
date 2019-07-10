import { Item } from '../Item.js'

// console.log(Soul)
class BALANCESYM {
  static NAME = 'BALANCESYM'
  static filename = 'BALANCESYM'

  constructor () {
    return new Item({
      NAME: 'BALANCESYM',
      name: 'Trendy balance symbol',
      cost: 8,
      desc: 'Use the average of MELEE, RANGED, and MAGIC in place of each stat whenever beneficial',
      tier: 'fine',
      // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
      replacements: [
        {
          statName: 'MELEE',
          value: function (unit) {
            return 0.33334 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.RANGED + unit.convertedStatValues.MAGIC)
          }
        },
        {
          statName: 'RANGED',
          value: function (unit) {
            return 0.33334 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.RANGED + unit.convertedStatValues.MAGIC)
          }
        },
        {
          statName: 'MAGIC',
          value: function (unit) {
            return 0.33334 * (unit.convertedStatValues.MELEE + unit.convertedStatValues.RANGED + unit.convertedStatValues.MAGIC)
          }
        }
      ]
    })
  }
}
var obj = {
  filename: 'BALANCESYM',
  exprt: BALANCESYM
}
export default obj
// export default Spellsword
