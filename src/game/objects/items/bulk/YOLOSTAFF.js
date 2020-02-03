import { Item } from '../Item.js'

// console.log(Soul)
class YOLOSTAFF {
  static NAME = 'YOLOSTAFF'
  static filename = 'YOLOSTAFF'

  constructor () {
    return new Item({
      NAME: 'YOLOSTAFF',
      name: 'Staff of YOLO',
      cost: 8,
      tier: 'fine',
      // desc: 'Nullifies HALF of base DRED, converting each point into 1 DREF, .1 MP, and .25 MAGIC.',
      desc: '-0.35x base DRED.  Adds 0.5x base DRED to DREF, 2x base DRED to MAGIC, and 0.25x base DRED to MP.',
      converts: [
        { from: 'DRED', to: 'DREF', value: 0.5 },
        { from: 'DRED', to: 'DRED', value: -0.35 },
        { from: 'DRED', to: 'MP', value: 0.25 },
        { from: 'DRED', to: 'MAGIC', value: 2 }
      ]
    })
  }
}
var obj = {
  filename: 'YOLOSTAFF',
  exprt: YOLOSTAFF
}
export default obj
// export default Martyrstaff
