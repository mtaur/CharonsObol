import { classdir as statusLib } from './jsload.js'
// import { hasIn as hasProp, cloneDeep as clone } from 'lodash'
import { hasIn as hasProp } from 'lodash'
// import { cloneDeep as clone } from 'lodash'

// console.log(Soul)
class Status {
  // static NAME = 'BROCANTRIP'
  static LIB = {}

  // NAME: 'GUARD',
  // name: 'guard',
  // desc: 'Increased DRED stat.  Interrupts targeting of melee or ranged skills.',
  // remove: [
  //   'DAMAGE',
  //   'USETURN'
  // ],
  // effects: [
  //   // { trigger: , effect: }
  // ],
  // bonus: [],
  // converts: [
  //   {
  //     from: 'DRED',
  //     to: 'DRED',
  //     value: 1
  //   }
  // ]
  NAME = 'IDLE'
  name = 'Idle'
  desc = 'This is a template. It does nothing.'
  upkeep = 0
  remove = []
  effects = [{ trigger: [], effects: {} }]
  bonus = []
  statBonus = []
  converts = [] // [{ from: 'DRED', to: 'DREF', value: 1 }, ...]
  replacements = [] // [{ statName: 'MAGIC', value: function (unit) { return 27.18 } }, ...]
  //
  unit = null
  // function (unit, validSlotArrayForItem)
  equipTo = function (unit) {
    unit.equip(this)
  }
  clearCheck = function (unit, trigger) {
    // console.log('this:', this)
    // console.log('trigger:', trigger)
    for (let index in this.remove) {
      let cond = this.remove[index]
      // console.log('cond:', cond)
      if (cond === trigger) {
        // console.log('should clear something...')
        this.clear(unit)
      } // return true
    }
    // return false
  }
  clear = function (unit) {
    // console.log('Clear this:', this)
    // console.log('unit:', unit)
    // for (let index in unit.statuses) {
    for (let index = unit.statuses.length - 1; index >= 0; index--) {
      if (unit.statuses[index].NAME === this.NAME) {
        // console.log('splice!!!!')
        unit.statuses.splice(index, 1)
      }
    }
  }
  // triggerCheck = function (unit, trigger, actionType = '', selector = {}) {
  triggerCheck = function (unit, trigger, action = {}, selector = {}) {
    // console.log('this:', this)
    // console.log('trigger:', trigger)
    console.log('triggerCheck', this)
    // Maybe loop over more than one effect in the future?
    for (let effectIndx in this.effects) {
      for (let index in this.effects[effectIndx].trigger) {
        let cond = this.effects[effectIndx].trigger[index]
        // console.log('cond:', cond)
        if (cond === trigger) {
          console.log('Should fire status update...', this)
          // console.log('should clear something...')
          // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, actionType, this, selector)
          //
          // old!
          // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, action, this, selector)
          // console.log(selector.log)
          // selector.log.push(logItem)
          // console.log('logItem', logItem)
          // console.log('cond', cond)
          // // this.effects[effectIndx].update(unit, trigger, actionType, this.effects[effectIndx])
          // this.effects[effectIndx].update(unit, trigger, action, this.effects[effectIndx])
          //
          //
          let logItems = this.effects[effectIndx].getLogItem(unit, trigger, action, this, selector)
          for (let index in logItems.log) {
            let logItem = logItems.log[index]
            logItem.round = selector.roundNum
            selector.logID++
            logItem.id = selector.logID
            selector.log.push(logItem)
            console.log('logItem', logItem)
          }
          console.log(selector.log)
          console.log('cond', cond)
          // this.effects[effectIndx].update(unit, trigger, actionType, this.effects[effectIndx])
          this.effects[effectIndx].update(unit, trigger, action, this.effects[effectIndx])
        } // return true
      }
    }
    // return false
  }

  // triggerCheckEffect = function function (unit, trigger, effect = {}, selector = {}) {
  triggerCheckEffect = function (unit, trigger, data) {
    console.log('Check for effect-level trigger (not complete actions)')
    console.log('triggerCheckEffect', this)
    // loop over STATUS's effect
    for (let effectIndx in this.effects) {
      for (let index in this.effects[effectIndx].trigger) {
        let cond = this.effects[effectIndx].trigger[index]
        if (cond === trigger) {
          console.log('Should fire status update...', this)
          let logItems = this.effects[effectIndx].getLogItem(unit, trigger, data)
          console.log(logItems)
          let selector = unit.playerTeam.getSelector()
          for (let logIndx in logItems.log) {
            let logItem = logItems.log[logIndx]
            logItem.round = selector.roundNum
            selector.logID++
            logItem.id = selector.logID
            selector.log.push(logItem)
            console.log('logItem!!!!', logItem)
          }
          // let logItem = this.effects[effectIndx].getLogItem(unit, trigger, data).log
          this.effects[effectIndx].update(unit, trigger, data)
          // console.log(selector.log)
          // selector.log.push(logItem)
          // console.log('logItem', logItem)
          // console.log('cond', cond)
          // this.effects[effectIndx].update(unit, trigger, action, this.effects[effectIndx])
        }
      }
    }
  }

  constructor (obj) {
    for (let propName in obj) {
      if (hasProp(this, propName)) {
        this[propName] = obj[propName]
      } else { alert('Item constructor: Missing prop', propName) }
    }
    // this.name = obj.name
    // this.statBonus = obj.statBonus
    // this.desc = obj.desc
    // this.equip = obj.equip
    // this.replacements = this.replacements
    // this.tier = obj.tier
    //
    // validate???
  }
}

// populate library using jsload from ./bulk
for (let key in statusLib) {
  let NamedStatus = statusLib[key]
  // Redundant functionality with constructor, but ESLint
  // doesn't like 'unused' objects:
  if (!Status.LIB[NamedStatus.NAME]) { Status.LIB[NamedStatus.NAME] = NamedStatus }
}

export { Status }
