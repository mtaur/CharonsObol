import { Item } from '../Item.js'

// console.log(Soul)
class DORY {
  static NAME = 'DORY'
  static filename = 'DORY'

  constructor () {
    return new Item({
      NAME: 'DORY',
      name: 'Dory',
      cost: 5,
      tier: 'common',
      statBonus: { MELEE: 4, RANGED: 4 },
      desc: '+4 MELEE, +4 RANGED.  (I speak Hoplite.)'
    })
  }
}
var obj = {
  filename: 'DORY',
  exprt: DORY
}
export default obj
// export default BlueRing
