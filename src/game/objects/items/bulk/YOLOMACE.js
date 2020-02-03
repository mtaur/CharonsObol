import { Item } from '../Item.js'

// console.log(Soul)
class YOLOMACE {
  static NAME = 'YOLOMACE'
  static filename = 'YOLOMACE'

  constructor () {
    return new Item({
      NAME: 'YOLOMACE',
      name: 'YOLO Mace',
      cost: 8,
      desc: '-0.35x base DRED. Adds 0.5x base DRED to DREF and 2x base DRED to MELEE.\nYOLO!!!',
      tier: 'fine',
      converts: [
        { from: 'DRED', to: 'DREF', value: 0.5 },
        { from: 'DRED', to: 'MELEE', value: 2 },
        { from: 'DRED', to: 'DRED', value: -0.35 }
      ]
    })
  }
}
var obj = {
  filename: 'YOLOMACE',
  exprt: YOLOMACE
}
export default obj
// export default Yolomace
