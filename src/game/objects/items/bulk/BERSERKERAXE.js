import { Item } from '../Item.js'

// console.log(Soul)
class BERSERKERAXE {
  static NAME = 'BERSERKERAXE'
  static filename = 'BERSERKERAXE'

  constructor () {
    return new Item({
      NAME: 'BERSERKERAXE',
      name: 'Berserker Axe',
      cost: 8,
      desc: 'Lose 35% of base DRED. Gain 10% of current health as MELEE, ' +
        'and 5% of current health as DREF.',
      tier: 'common',
      // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
      replacements: [
        {
          statName: 'MELEE',
          value: function (unit) {
            return unit.convertedStatValues.MELEE + 0.1 * unit.baseStats.HP.current
            // return unit.convertedStatValues.MELEE + Math.min(0.1 * unit.baseStats.HP.current, 2 * unit.convertedStatValues.DRED)
          }
        },
        {
          statName: 'DREF',
          value: function (unit) {
            return unit.convertedStatValues.MELEE + 0.05 * unit.baseStats.HP.current
            // return unit.convertedStatValues.MELEE + Math.min(0.1 * unit.baseStats.HP.current, 2 * unit.convertedStatValues.DRED)
          }
        }
      ],
      converts: [
        { from: 'DRED', to: 'DRED', value: -0.35 }
      ]
    })
  }
}
var obj = {
  filename: 'BERSERKERAXE',
  exprt: BERSERKERAXE
}
export default obj
// export default BerserkerAxe
