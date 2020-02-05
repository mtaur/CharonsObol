// import { cpuJSON, playerJSON } from 'src/game/demoObjSetup.js'
import { Soul } from 'src/game/objects/souls/Soul.js'

// let playerTeam = new Team(Unit.SIDE.PLAYER)
// let cpuTeam = new Team(Unit.SIDE.CPU)
let lostSouls = []
for (let NAME in Soul.LIB) {
  if (!Soul.LIB[NAME].restricted) {
    lostSouls.push(NAME)
  }
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
  lostSouls
}
