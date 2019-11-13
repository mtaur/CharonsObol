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
      desc: 'Nullifies base 35% DRED, converting each point to 1 DREF and 3 MELEE.\nYOLO!!!',
      tier: 'fine',
      converts: [
        { from: 'DRED', to: 'DREF', value: 0.35 },
        { from: 'DRED', to: 'MELEE', value: 1.05 },
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
