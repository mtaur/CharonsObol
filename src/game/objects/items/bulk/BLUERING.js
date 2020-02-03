import { Item } from '../Item.js'

// console.log(Soul)
class BLUERING {
  static NAME = 'BLUERING'
  static filename = 'BLUERING'

  constructor () {
    return new Item({
      NAME: 'BLUERING',
      name: 'Blue Ring',
      cost: 4,
      tier: 'common',
      statBonus: { MP: 1 },
      // desc: '+1 MP'
      desc: 'A simple blue ring that raises base MP by 1.'
    })
  }
}
var obj = {
  filename: 'BLUERING',
  exprt: BLUERING
}
export default obj
// export default BlueRing
