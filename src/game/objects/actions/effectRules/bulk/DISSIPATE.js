// import { TargetRule } from '../TargetRule.js'
// import { hasIn as hasProp } from 'lodash'
// import { Stat } from '../../../units/Stat.js'

function DISSIPATE (effectObj = {}, target = {}, caster = {}) {
  // targetAllies = targetAllies > 0 ? targetAllies : 1

  let summarize = function () {
    // let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })
    // function findById (arr, id) {
    //   let found = {}
    //   arr.forEach((item) => {
    //     if (item.id === id) {
    //       found = item
    //     }
    //   })
    //   return found
    // }
    // let amounts = computeAmounts().amounts
    // let healTot = computeAmounts().healTot

    function computeAmounts () {
      let canHeal = Math.floor(target.baseStats.HP.current * 0.5) // target.baseStats.HP.max - target.baseStats.HP.current
      console.log('canheal:', canHeal)

      // let damage = 0
      // targetAllies.forEach((unit) => { damage += Math.max(unit.baseStats.HP.max - unit.baseStats.HP.current, 0) })

      let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })
      // function findById (arr, id) {
      //   let found = {}
      //   arr.forEach((item) => {
      //     if (item.id === id) {
      //       found = item
      //     }
      //   })
      //   return found
      // }

      let healLeft = canHeal
      let healTot = 0

      let amounts = []
      targetAllies.forEach((unit) => {
        amounts.push({
          id: unit.id,
          amount: 0,
          left: unit.baseStats.HP.max - unit.baseStats.HP.current
        })
      })

      // let findById = (arr, id) => {
      //   arr.forEach((item) => {
      //     if (item.id === id) {
      //       return item
      //     }
      //   })
      // }

      let totalLeft = (arr) => {
        let total = 0
        arr.forEach((item) => { total += item.left })
        return total
      }
      let damagedCount = (arr) => {
        console.log('damagedcount:', arr.filter((item) => { return item.left > 0 }).length)
        return arr.filter((item) => { return item.left > 0 }).length
      }
      let minDmg = (arr) => {
        let amt = 0
        arr.forEach((item) => {
          if (item.left > 0 && amt === 0) {
            amt = item.left
          }
          if (item.left > 0 && amt > 0) {
            amt = Math.min(amt, item.left)
          }
          // // amt = (amt === 0 && item.left > 0) ? item.left : 0
          // amt = item.left > 0 ? Math.min(amt, item.left) : amt
        })
        return amt
      }

      while (totalLeft(amounts) > 0 && healLeft > 0) {
        let incr = Math.min(healLeft / damagedCount(amounts), minDmg(amounts))
        incr = Math.floor(incr)
        console.log('incr:', incr)
        amounts.forEach((item) => {
          if (item.left > 0) {
            item.left -= incr
            item.amount += incr
            healTot += incr
            healLeft -= incr
          }
        })
        if (incr === 0) { healLeft = 0 }
      }

      return {
        amounts,
        healTot
      }
    }

    let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })
    function findById (arr, id) {
      let found = {}
      arr.forEach((item) => {
        if (item.id === id) {
          found = item
        }
      })
      return found
    }

    let amounts = computeAmounts().amounts
    let healTot = computeAmounts().healTot
    console.log('amounts', amounts)
    console.log('healtot', healTot)

    let log = []

    for (let index in targetAllies) {
      let ally = targetAllies[index]
      let amount = findById(amounts, ally.id).amount // Math.min(amount, ally.baseStats.HP.current)
      let logItem = {
        text: `${target.name} healed ${ally.name} for ${amount} HP!`,
        type: 'heal',
        // healAmount: healAmount,
        amount: amount,
        caster: caster,
        target: target
      }
      if (amount > 0) { log.push(logItem) }
    }

    // let dred = 0
    // let dref = 0
    // let healAmount = Math.min(canHeal, amount * targetAllies.length)
    let data = {
      type: 'dissipate',
      // dred: dred,
      // dref: dref,
      amounts: amounts,
      healTot: healTot,
      caster: caster,
      target: target
    }
    log.push(
      {
        text: `${target.name} dissipated away ${healTot} HP...`,
        type: 'heal',
        healTot: healTot,
        amount: healTot,
        caster: caster,
        target: target
      }
    )

    let summary = {
      data: data,
      log: log
    }
    return summary
  }

  let apply = function () {
    // let reverseForEach = (arr, fcn) => {
    //   for (let index = arr.length - 1; index >= 0; index--) {
    //     fcn(arr[index])
    //     index = Math.min(index, arr.length)
    //   }
    // }

    let targetAllies = target.allies.field.filter((item) => { return item.id !== target.id })
    let findById = (arr, id) => {
      let found = {}
      arr.forEach((item) => {
        if (item.id === id) {
          found = item
          return item
        }
      })
      return found
    }

    let summary = this.summarize()
    let data = summary.data
    let healTot = data.healTot
    let amounts = data.amounts

    targetAllies.forEach((ally) => {
      let allyData = {
        type: 'heal',
        // dred: 0,
        // dref: 0,
        amount: findById(amounts, ally.id).amount,
        // amount is automatically capped at the amount needed to kill lowest health ally
        // actualAmount: data.amount,
        caster: caster,
        target: ally
      }

      ally.baseStats.HP.current += allyData.amount
      ally.baseStats.HP.current = Math.ceil(ally.baseStats.HP.current) // target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
      // target.baseStats.HP.current += data.healAmount
      // target.baseStats.HP.current = Math.ceil(target.baseStats.HP.current) // target.baseStats.HP.current > 0 ? Math.floor(target.baseStats.HP.current) : 0
      //
      // caster.checkAlive()
    })
    caster.baseStats.HP.current -= healTot

    this.summary = summary
  }

  // return apply
  return { apply: apply, summarize: summarize }
}

var obj = {
  filename: 'DISSIPATE',
  exprt: DISSIPATE
}
export default obj
// DAMAGE.NAME = 'DAMAGE'
// export default DAMAGE
