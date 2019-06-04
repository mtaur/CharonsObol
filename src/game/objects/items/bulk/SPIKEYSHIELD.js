import { Item } from '../Item.js'

// console.log(Soul)
class SPIKEYSHIELD {
  static NAME = 'SPIKEYSHIELD'
  static filename = 'SPIKEYSHIELD'

  constructor () {
    return new Item({
      NAME: 'SPIKEYSHIELD',
      name: 'Spikey Shield',
      cost: 5,
      tier: 'common',
      desc: '+1 DRED, +2 DREF',
      statBonus: { DRED: 1, DREF: 2 }
    })
  }
}
var obj = {
  filename: 'SPIKEYSHIELD',
  exprt: SPIKEYSHIELD
}
export default obj
// export default SpikeyShield
