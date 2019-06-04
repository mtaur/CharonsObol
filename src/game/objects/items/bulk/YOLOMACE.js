import { Item } from '../Item.js'

// console.log(Soul)
class YOLOMACE {
  static NAME = 'YOLOMACE'
  static filename = 'YOLOMACE'

  constructor () {
    return new Item({
      NAME: 'YOLOMACE',
      name: 'YOLO Mace',
      cost: 6,
      desc: 'Nullifies base 100% DRED, converting each point to 3 MELEE.\nYOLO!!!',
      tier: 'fine',
      converts: [
        { from: 'DRED', to: 'MELEE', value: 3 },
        { from: 'DRED', to: 'DRED', value: -1 }
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
