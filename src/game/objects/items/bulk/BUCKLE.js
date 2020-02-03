import { Item } from '../Item.js'

// console.log(Soul)
class BUCKLE {
  static NAME = 'BUCKLE'
  static filename = 'BUCKLE'

  constructor () {
    return new Item({
      NAME: 'BUCKLE',
      name: 'Buckle',
      cost: 2,
      tier: 'cheap',
      desc: '+1 DRED.  Somewhat buckly, but not as buckly as a buckler.',
      statBonus: { DRED: 1 }
    })
  }
}
var obj = {
  filename: 'BUCKLE',
  exprt: BUCKLE
}
export default obj
// export default BronzeRing
