import { Item } from '../Item.js'

// console.log(Soul)
class SpikeyShield {
  static NAME = 'SPIKEYSHIELD'

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

// {
//   name: 'Spikey Shield',
// }

export default SpikeyShield
