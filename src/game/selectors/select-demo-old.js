var selector = {}

selector.data = {}

import { player, cpu } from 'src/game/selectors/demo'

console.log(player)
console.log(cpu)

function chooseRand (arr) {
  console.log('chose...')
  return arr[Math.floor(arr.length * (Math.random()))]
}

function delayedRand (arr) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(chooseRand(arr)), 3300)
  })
}

console.log(chooseRand(player.all))
console.log(chooseRand(player.all))
console.log(chooseRand(player.all))

function chainLgt (enemy) {
  let t1 = enemy.front.length > 0 ? enemy.front : enemy.back
  let t2 = null
  if (enemy.all.length > 0 && enemy.back.length > 0) {
    t2 = enemy.back
  } else if (enemy.front.length > 0 && enemy.back.length === 0) {
    t2 = enemy.front
  } else if (enemy.all.length < 2) {
    t2 = null
  }
  return [chooseRand(t1), chooseRand(t2)]
//  return t1 + t2
}

console.log(chainLgt(cpu))
console.log(chainLgt(cpu))
console.log(chainLgt(cpu))
console.log(chainLgt(cpu))

function setVal (x) {
  return (val) => {
    console.log('Set value x = ' + val + '?')
    x.val = val
    console.log('Here is the x-value:' + x.val)
    return new Promise((resolve, reject) => {
      resolve() // ('x = ' + val)
      console.log('x = ' + x.val)
    })
  }
}

function promiseChainLgt (enemy) {
  let t1 = enemy.front.length > 0 ? enemy.front : enemy.back
  let t2 = null
  if (enemy.all.length > 0 && enemy.back.length > 0) {
    t2 = enemy.back
  } else if (enemy.front.length > 0 && enemy.back.length === 0) {
    t2 = enemy.front
  } else if (enemy.all.length < 2) {
    t2 = null
  }
  //  return [chooseRand(t1), chooseRand(t2)]
  //  return t1 + t2
  console.log(t2)

  return new Promise((resolve, reject) => {
    let first = {}
    let second = {}
    delayedRand(t1)
      .then(setVal(first))
      .then(() => delayedRand(t2))
      .then(setVal(second))
      .then(() => resolve([first.val + ' hit first', second.val + ' hit second']))
    // resolve(Promise.all([delayedRand(t1), delayedRand(t2)])) // .then(delayedRand(t2)))
  })
}

var y = {}
setVal(y)(7).then(console.log)
console.log(y)

function apply (fcn, index) {
  return (arr) => fcn(arr[index])
}

function applyAll (fcn) {
  return (arr) => arr.forEach((item) => fcn(item)) // manually reject other parameters from fcn
}

// console.log(promiseChainLgt(player) + 'zapped!')
promiseChainLgt(player).then(applyAll(console.log)).then(() => console.log('zapped!'))

apply(console.log, 3)(['cat', 'dog', 'pineapple', 'fish', 'batman', 'donut'])

export { player, cpu }
