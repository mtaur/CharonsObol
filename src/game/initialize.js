import { Unit, Team } from './objects/units/unit.js'
import { cloneDeep as clone } from 'lodash'
import { Soul } from './objects/souls/soul.js'

function uniqClone (unit) {
  let copy = clone(unit)
  copy.id = Unit.id
  return copy
}

var playerTeam = new Team(Unit.SIDE.PLAYER)
var cpuTeam = new Team(Unit.SIDE.CPU)
var gameObj = { playerTeam: playerTeam, cpuTeam: cpuTeam }

// test script
var jaq = new Unit(gameObj)
// playerTeam.front.push(jaq)

// console.log('SP', jaq.SP)
// console.log('HP', jaq.baseStats.HP.value)
jaq.raise('HP')
jaq.raise('HP')
jaq.raise('HP')
// console.log('SP', jaq.SP)
// console.log('HP', jaq.baseStats.HP.value)

// console.log('MELEE', jaq.baseStats.MELEE.value)
jaq.raise('MELEE')
jaq.raise('MELEE')
jaq.raise('MELEE')
jaq.raise('MELEE')
// console.log('MELEE', jaq.baseStats.MELEE.value)
// console.log('SP', jaq.SP)

var jaqClone = uniqClone(jaq)
console.log(jaqClone)

// var jaqs = []
for (let i = 0; i < 6; i++) {
  i < 4 ? cpuTeam.front.push(new Unit()) : cpuTeam.back.push(new Unit())
  // i < 4 ? cpuTeam.front.push(uniqClone(jaq)) : cpuTeam.back.push(uniqClone(jaq))
}

// console.log('DR', jaq.baseStats.DR.value)
cpuTeam.front[0].raise('DR')
// jaq.raise('DR')
// jaq.raise('DR')
// console.log('SP', jaq.SP)
// console.log('DR', jaq.baseStats.DR.value)

// console.log(playerTeam)

var pensoul = new Soul.LIB.PENELOPE()
var pen = new Unit(gameObj, { name: pensoul.name, hero: true })
// var pen = new Unit({ name: Soul.LIB.PENELOPE().name, hero: true })
playerTeam.back.push(pen)
pen.souls = [pensoul]
pen.raise('RANGED')
pen.raise('RANGED')
pen.raise('MAGIC')
pen.raise('MAGIC')
pen.raise('MAGIC')
pen.raise('MAGIC')
pen.raise('MP')
pen.raise('HP')
pen.raise('HP')
// console.log(pen.souls)
// console.log(pen.baseSummary)
// console.log(pen.soulSummary)
// console.log(jaq.soulSummary)

var lynnsoul = new Soul.LIB.LYNN()
var lynn = new Unit(gameObj, { name: lynnsoul.name, hero: true })
playerTeam.front.push(lynn)
// lynn.souls = [Soul.LIB.LYNN()]
lynn.souls = [lynnsoul]
lynn.raise('RANGED')
lynn.raise('RANGED')
lynn.raise('RANGED')
lynn.raise('MELEE')
lynn.raise('MELEE')
lynn.raise('MELEE')
lynn.raise('HP')
lynn.raise('HP')
lynn.raise('HP')

lynn.baseStats.HP.current -= 15
// console.log(lynn.souls)
// console.log(lynn.baseSummary)
// console.log(lynn.soulSummary)

var brosoul = new Soul.LIB.BROCANTRIP()
var bro = new Unit(gameObj, { name: brosoul.name, hero: true })
playerTeam.front.push(bro)
// bro.souls = [Soul.LIB.BROCANTRIP()]
bro.souls = [brosoul]
bro.raise('RANGED')
bro.raise('MP')
bro.raise('MP')
bro.raise('RANGED')
bro.raise('MAGIC')
bro.raise('MAGIC')
bro.raise('HP')
bro.raise('HP')
bro.raise('HP')

lynn.actions = ['melee', 'ranged', 'lunge', 'block']

export { cpuTeam, playerTeam }
