import { Item } from '../Item.js'

// console.log(Soul)
class BRONZERING {
  static NAME = 'BRONZERING'
  static filename = 'BRONZERING'

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
var obj = {
  filename: 'BRONZERING',
  exprt: BRONZERING
}
export default obj
// export default BronzeRing
