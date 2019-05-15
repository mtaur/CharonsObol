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

// {
//   name: 'Spikey Shield',
//   statBonus: { DRED: 1, DREF: 2 },
//   desc: '+1 DRED, +2 DREF'
// }

export default BronzeRing
