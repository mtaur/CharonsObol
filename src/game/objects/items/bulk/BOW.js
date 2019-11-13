import { Item } from '../Item.js'

// console.log(Soul)
class BOW {
  static NAME = 'BOW'
  static filename = 'BOW'

  constructor () {
    return new Item({
      NAME: 'BOW',
      name: 'Bow',
      cost: 4,
      tier: 'common',
      statBonus: { RANGED: 6 },
      desc: '+6 RANGED'
    })
  }
}
var obj = {
  filename: 'BOW',
  exprt: BOW
}
export default obj
// export default BlueRing
