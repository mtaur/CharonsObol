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
      statBonus: { MAGIC: 6 },
      desc: '+6 MAGIC (nondescript)'
    })
  }
}
var obj = {
  filename: 'MAGICSTAFF',
  exprt: MAGICSTAFF
}
export default obj
// export default MagicStaff
