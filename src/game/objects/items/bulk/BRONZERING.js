import { Item } from '../Item.js'

// console.log(Soul)
class BronzeRing {
  static NAME = 'BRONZERING'

  constructor () {
    return new Item({
      NAME: 'BRONZERING',
      name: 'Bronze Ring',
      cost: 2,
      tier: 'cheap',
      desc: '+1 DRED',
      statBonus: { DRED: 1 }
    })
  }
}

export default BronzeRing
