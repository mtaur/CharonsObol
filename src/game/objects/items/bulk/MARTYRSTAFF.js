import { Item } from '../Item.js'

// console.log(Soul)
class MARTYRSTAFF {
  static NAME = 'MARTYRSTAFF'
  static filename = 'MARTYRSTAFF'

  constructor () {
    return new Item({
      NAME: 'MARTYRSTAFF',
      name: 'Martyr Staff',
      cost: 8,
      tier: 'fine',
      desc: 'Nullifies base DRED, converting each point into 1 DREF, .1 MP, and .25 MAGIC.',
      converts: [
        { from: 'DRED', to: 'DREF', value: 1 },
        { from: 'DRED', to: 'DRED', value: -1 },
        { from: 'DRED', to: 'MP', value: 0.1 },
        { from: 'DRED', to: 'MAGIC', value: 0.25 }
      ]
    })
  }
}
var obj = {
  filename: 'MARTYRSTAFF',
  exprt: MARTYRSTAFF
}
export default obj
// export default Martyrstaff
