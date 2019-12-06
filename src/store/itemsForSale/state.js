// import { cpuJSON, playerJSON } from 'src/game/demoObjSetup.js'
import { Item } from 'src/game/objects/items/Item.js'

// let playerTeam = new Team(Unit.SIDE.PLAYER)
// let cpuTeam = new Team(Unit.SIDE.CPU)
let itemsForSale = []
for (let NAME in Item.LIB) {
  itemsForSale.push(NAME)
}

// let addLostSoul = (soulStr) => {
//   let unit = new UnitTemplate.LIB.HERO({ soulsArr: [soulStr], itemsArr: [], pos: row, side: 'player', lvlUp: {} }, { playerTeam, cpuTeam })
//   return unit
// }
// let addLostSouls = () => {
//   for (let str in Soul.LIB) {
//     lostSouls.push(this.addLostSoul(str))
//   }
// }

export default {
  itemsForSale
}
