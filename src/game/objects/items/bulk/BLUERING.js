import { Item } from '../Item.js'

// console.log(Soul)
class BlueRing {
  static NAME = 'BLUERING'

  constructor () {
    return new Item({
      NAME: 'BLUERING',
      name: 'Blue Ring',
      cost: 4,
      tier: 'common',
      statBonus: { MP: 1 },
      desc: '+1 MP'
    })
  }
}
// {
//   name: 'Spikey Shield',
//   statBonus: { DRED: 1, DREF: 2 },
//   desc: '+1 DRED, +2 DREF'
// }

export default BlueRing
