import { Stat } from '../units/baseStats.js'
import { classdir as soulLib } from './jsload.js'

class Soul {
  // default values taken from constructor.
  // ONLY cost is an automatic default value.
  // The rest are missing if not provided.
  //
  // NAME = ''
  // name = ''
  // bonus = {}
  // skills = []
  // desc = ''
  // cost = [0, 5, 10]

  static LIB = {}

  static validateObj (obj) {
    // Soul with no bonuses is ok, nothing to check
    if (!obj.bonus) { return true }
    // ...otherwise, validate all stat gains.
    for (let key in obj.bonus) {
      if (!Stat.LIB[key]) {
        throw new Error('bad stat name' + key + '!')
        // return false???
      }
    }
    return true
  }

  // Constructor automatically archives new soul in
  // Soul.LIB
  constructor (obj) {
    if (Soul.validateObj(obj)) {
      if (!Soul.LIB[obj.NAME]) {
        // default cost properties
        if (!obj.cost) { obj.cost = [0, 5, 10] }
        Soul.LIB[obj.NAME] = obj
      }
      return obj
    }
  }
}

// populate library using jsload from ./bulk
for (let key in soulLib) {
  let soul = new soulLib[key]()
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  Soul.LIB[soul.NAME] = soul
}

// console.log(Soul.LIB)

export { Soul }
