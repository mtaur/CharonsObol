import { Item } from '../Item.js'

// console.log(Soul)
class BRONZERING {
  static NAME = 'BRONZERING'
  static filename = 'BRONZERING'

  constructor () {
    return new Item({
      NAME: 'BRONZERING',
      name: 'Bronze Ring',
      cost: 3,
      tier: 'cheap',
      desc: '+2 DRED',
      statBonus: { DRED: 2 }
    })
  }
}
var obj = {
  filename: 'BRONZERING',
  exprt: BRONZERING
}
export default obj
// export default BronzeRing
