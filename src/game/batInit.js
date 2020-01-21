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

  for (let propName in teamConfig.playerTeam) {
    playerTeam[propName] = teamConfig.playerTeam[propName]
    console.log(propName, playerTeam[propName])
  }
  for (let propName in teamConfig.cpuTeam) {
    cpuTeam[propName] = teamConfig.cpuTeam[propName]
    console.log(propName, cpuTeam[propName])
  }

  cpuJSON.forEach((json) => { unitAdd(json, Unit.SIDE.CPU) })
  playerJSON.forEach((json) => { unitAdd(json, Unit.SIDE.PLAYER) })
  playerTeam.all.forEach((unit) => {
    unit.actions.push(new Action.LIB.RESTMAJOR(unit))
    unit.actions.push(new Action.LIB.RESTMINOR(unit))
    removeDuplicates(unit.actions)
  })

  // let reverseForEach = (arr, fcn) => {
  //   for (let index = arr.length - 1; index >= 0; index--) {
  //     fcn(arr[index])
  //     index = Math.min(index, arr.length)
  //   }
  // }

  let retObj = {
    cpuTeam,
    playerTeam // ,
    // scrolls
  }

  return retObj
}

export { setup }
