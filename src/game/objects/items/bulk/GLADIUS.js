import { Item } from '../Item.js'

// console.log(Soul)
class GLADIUS {
  static NAME = 'GLADIUS'
  static filename = 'GLADIUS'

  constructor () {
    return new Item({
      NAME: 'GLADIUS',
      name: 'Gladius',
      cost: 4,
      tier: 'common',
      statBonus: { MELEE: 6 },
      desc: '+6 MELEE.  (Gladius? Darn near killed us!)'
    })
  }
}
var obj = {
  filename: 'GLADIUS',
  exprt: GLADIUS
}
export default obj
// export default BlueRing
