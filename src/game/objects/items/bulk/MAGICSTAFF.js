import { Item } from '../Item.js'

// console.log(Soul)
class MagicStaff {
  static NAME = 'MAGICSTAFF'

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

export default MagicStaff
