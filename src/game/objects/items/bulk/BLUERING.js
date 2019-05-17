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

export default BlueRing
