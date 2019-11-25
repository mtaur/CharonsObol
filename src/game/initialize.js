import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
// import { hasIn as hasProp } from 'lodash'
// import { Soul } from './objects/souls/Soul.js'
// import { CPUUnit } from './objects/units/CPUUnit.js'
// import { Item } from './objects/items/Item.js'
import { Action } from './objects/actions/Action.js'
// import { Status } from './objects/statuses/Status.js'
import { UnitTemplate } from './objects/units/templates/UnitTemplate'
import { cpuJSON, playerJSON } from './demoObjSetup.js'

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

function removeDuplicates (arr, propName = 'NAME') {
  console.log(arr)
  // let PROPNAME = propName
  for (let i = arr.length - 1; i > -1; i--) {
    let str = arr[i][propName]
    for (let j = i - 1; j > -1; j--) {
      if (arr[j][propName] === str) {
        arr.splice(j, 1)
        i--
      }
    }
  }
}

let unitAdd = function (obj, side) {
  let team = {}
  if (side === Unit.SIDE.CPU) { team = cpuTeam }
  if (side === Unit.SIDE.PLAYER) { team = playerTeam }
  let unit = {}

  if (obj.passedObj === false) {
    unit = new UnitTemplate.LIB[obj.NAME](gameObj)
  } else {
    unit = new UnitTemplate.LIB[obj.NAME](obj.passedObj, gameObj)
    // if (hasProp(obj, 'passedObj.lvlUp')) {
    //   let lvlUp = obj.passedObj.lvlUp
    //   for (let statName in lvlUp) {
    //     for (let i = 0; i < lvlUp[statName]; i++) {
    //       unit.raise(statName)
    //     }
    //   }
    // }
  }
  team.deploy(unit)
  removeDuplicates(unit.actions)
}

cpuJSON.forEach((json) => { unitAdd(json, Unit.SIDE.CPU) })
playerJSON.forEach((json) => { unitAdd(json, Unit.SIDE.PLAYER) })

playerTeam.all.forEach((unit) => {
  unit.actions.push(new Action.LIB.RESTMAJOR(unit))
  unit.actions.push(new Action.LIB.RESTMINOR(unit))
})

playerTeam.inventory.SMOKEBOMB = 1
playerTeam.inventory.HEALTHPOT = 1
playerTeam.inventory.LIZARDTAIL = 1
playerTeam.inventory.MANAPOT = 1
playerTeam.inventory.WRATHSCROLL = 1
playerTeam.inventory.FLAMEFISTSCROLL = 1
playerTeam.inventory.HEALSCROLL = 1
playerTeam.inventory.ENLIGHTENSCROLL = 1

export { cpuTeam, playerTeam }
