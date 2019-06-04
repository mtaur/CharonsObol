import { Item } from '../Item.js'

// console.log(Soul)
class MAGICSTAFF {
  static NAME = 'MAGICSTAFF'
  static filename = 'MAGICSTAFF'

  constructor () {
    return new Item({
      NAME: 'MAGICSTAFF',
      name: 'Magic Staff',
      cost: 4,
      tier: 'common',
      desc: '+5 MAGIC',
      statBonus: { MAGIC: 5 }
    })
  }
}
var obj = {
  filename: 'MAGICSTAFF',
  exprt: MAGICSTAFF
}
export default obj
// export default MagicStaff
