import { Item } from '../Item.js'

// console.log(Soul)
class DIVINEBARRIER {
  static NAME = 'DIVINEBARRIER'
  static filename = 'DIVINEBARRIER'

  constructor () {
    return new Item({
      NAME: 'DIVINEBARRIER',
      name: 'Divine Barrier',
      cost: 5,
      tier: 'common',
      desc: 'Lose 25% base MP, gaining 2 DRED per base MP and 0.15 DRED per base MAGIC.',
      converts: [
        { from: 'MAGIC', to: 'DRED', value: 0.15 },
        { from: 'MP', to: 'DRED', value: 2 },
        { from: 'MP', to: 'MP', value: -0.25 }
      ]
    })
  }
}
var obj = {
  filename: 'DIVINEBARRIER',
  exprt: DIVINEBARRIER
}
export default obj
// export default DivineBarrier
