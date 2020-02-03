import { Item } from '../Item.js'

// console.log(Soul)
class BUCKLER {
  static NAME = 'BUCKLER'
  static filename = 'BUCKLER'

  constructor () {
    return new Item({
      NAME: 'BUCKLER',
      name: 'Buckler',
      cost: 4,
      tier: 'common',
      desc: '+2 DRED',
      statBonus: { DRED: 2 }
    })
  }
}
var obj = {
  filename: 'BUCKLER',
  exprt: BUCKLER
}
export default obj
// export default BronzeRing
