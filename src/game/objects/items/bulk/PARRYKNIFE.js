import { Item } from '../Item.js'

// console.log(Soul)
class PARRYKNIFE {
  static NAME = 'PARRYKNIFE'
  static filename = 'PARRYKNIFE'

  constructor () {
    return new Item({
      NAME: 'PARRYKNIFE',
      name: 'Parrying Knife',
      cost: 5,
      tier: 'common',
      statBonus: { INIT: 2 },
      desc: '+2 INIT'
    })
  }
}
var obj = {
  filename: 'PARRYKNIFE',
  exprt: PARRYKNIFE
}
export default obj
// export default BlueRing
