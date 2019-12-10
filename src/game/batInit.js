import { Unit, Team } from './objects/units/Unit.js'
// import { cloneDeep as clone } from 'lodash'
// import { hasIn as hasProp } from 'lodash'
// import { Soul } from './objects/souls/Soul.js'
// import { CPUUnit } from './objects/units/CPUUnit.js'
// import { Item } from './objects/items/Item.js'
import { Action } from './objects/actions/Action.js'
// import { Status } from './objects/statuses/Status.js'
import { UnitTemplate } from './objects/units/templates/UnitTemplate'
// import { cpuJSON, playerJSON } from './demoObjSetup.js'

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

function removeDuplicates (arr, propName = 'NAME') {
  // console.log(arr)
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
  }
  team.deploy(unit)
  removeDuplicates(unit.actions)
}

let setup = function (input) {
  let cpuJSON = input.cpuJSON
  let playerJSON = input.playerJSON
  let teamConfig = input.config

  // cpuTeam.SPEff = 0.25
  // playerTeam.SPEff = 0.25
  // playerTeam.SPCap = 750
  // playerTeam.RSP
  // cpuTeam.SPCap = 750
  // cpuTeam.RSP
  cpuJSON.forEach((json) => { unitAdd(json, Unit.SIDE.CPU) })
  playerJSON.forEach((json) => { unitAdd(json, Unit.SIDE.PLAYER) })

  playerTeam.all.forEach((unit) => {
    unit.actions.push(new Action.LIB.RESTMAJOR(unit))
    unit.actions.push(new Action.LIB.RESTMINOR(unit))
  })

  for (let propName in teamConfig.playerTeam) {
    playerTeam[propName] = teamConfig.playerTeam[propName]
    console.log(propName, playerTeam[propName])
  }

  // let scrolls = {
  //   SMOKEBOMB: 1,
  //   HEALTHPOT: 1,
  //   LIZARDTAIL: 1,
  //   MANAPOT: 1,
  //   WRATCHSCROLL: 1,
  //   FLAMEFISTSCROLL: 1,
  //   HEALSCROLL: 1,
  //   ENLIGHTENSCROLL: 1
  // }
  // playerTeam.inventory.SMOKEBOMB = 1
  // playerTeam.inventory.HEALTHPOT = 1
  // playerTeam.inventory.LIZARDTAIL = 1
  // playerTeam.inventory.MANAPOT = 1
  // playerTeam.inventory.WRATHSCROLL = 1
  // playerTeam.inventory.FLAMEFISTSCROLL = 1
  // playerTeam.inventory.HEALSCROLL = 1
  // playerTeam.inventory.ENLIGHTENSCROLL = 1
  let retObj = {
    cpuTeam,
    playerTeam // ,
    // scrolls
  }

  return retObj
}

export { setup }
