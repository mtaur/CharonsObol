import { Item } from '../Item.js'

// console.log(Soul)
class BLIGHTROD {
  static NAME = 'BLIGHTROD'
  static filename = 'BLIGHTROD'

  constructor () {
    return new Item({
      NAME: 'BLIGHTROD',
      name: 'Blighted rod',
      cost: 8,
      tier: 'fine',
      desc: 'Lowers base scalings by 20%. Outgoing damage echoes as poison!',
      converts: [
        { from: 'HP', to: 'HP', value: -0.2 },
        { from: 'MP', to: 'MP', value: -0.2 },
        { from: 'MELEE', to: 'MELEE', value: -0.2 },
        { from: 'RANGED', to: 'RANGED', value: -0.2 },
        { from: 'MAGIC', to: 'MAGIC', value: -0.2 },
        { from: 'INIT', to: 'INIT', value: -0.2 },
        { from: 'DRED', to: 'DRED', value: -0.2 },
        { from: 'DREF', to: 'DREF', value: -0.2 }
      ],
      passives: [
        {
          name: 'damageechopoisonout',
          NAME: 'DAMAGEECHOPOISONOUT',
          params: {}
        }
      ]
    })
  }
}
var obj = {
  filename: 'BLIGHTROD',
  exprt: BLIGHTROD
}
export default obj
// export default Martyrstaff
