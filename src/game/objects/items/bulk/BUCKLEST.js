import { Item } from '../Item.js'

// console.log(Soul)
class BUCKLEST {
  static NAME = 'BUCKLEST'
  static filename = 'BUCKLEST'

  constructor () {
    return new Item({
      NAME: 'BUCKLEST',
      name: 'Bucklest',
      cost: 7,
      tier: 'fine',
      desc: '+3 DRED.  This is about as buckly as it gets.',
      statBonus: { DRED: 3 }
    })
  }
}
var obj = {
  filename: 'BUCKLEST',
  exprt: BUCKLEST
}
export default obj
// export default BronzeRing
