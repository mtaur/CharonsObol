import { Item } from '../Item.js'

// console.log(Soul)
class BerserkerAxe {
  static NAME = 'BERSERKERAXE'

  constructor () {
    return new Item({
      NAME: 'BERSERKERAXE',
      name: 'Berserker Axe',
      cost: 8,
      desc: 'Lose 50% of DRED. Gain up to 10% of current health as MELEE, up to twice the lost DRED amount.',
      tier: 'common',
      // replacements[0] = { statName: 'MELEE', value: 0.5*(MELEE + MAGIC) }
      replacements: [
        {
          statName: 'MELEE',
          value: function (unit) {
            // return unit.convertedStatValues.MELEE + 0.1 * unit.baseStats.HP.current
            return unit.convertedStatValues.MELEE + Math.min(0.1 * unit.baseStats.HP.current, unit.soulStatValues.DRED)
          }
        }
      ],
      converts: [
        { from: 'DRED', to: 'DRED', value: -0.5 }
      ]
    })
  }
}

export default BerserkerAxe