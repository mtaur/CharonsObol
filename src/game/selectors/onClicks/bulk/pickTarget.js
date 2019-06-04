// import x from y.js

var pickTarget = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  // selector.stateData.activeUnit = unit

  // Should be true if we get this far?:
  // if (selector.activeSkill.targetRules.length > 1) {
  // let next = clone(activeSkill)
  // let currTargLog = clone(prevTargs)
  // currTargLog.push(unit)
  // next.targetRules.shift()
  // next.targetRules[0].prevTargs = currTargLog
  selector.stateData.activeSkill.prevTargs.push(unit)
  selector.stateData.activeSkill.targetRules.shift()
  console.log('Active skill:', selector.stateData.activeSkill.name)
  console.log('prevTargs:', selector.stateData.activeSkill.prevTargs)
  // next.targLog(currTargLog)
  // selector.activeSkill = ???
  selector.changeState('ChooseTarget')
  // }
  // selector.changeState('ChooseUnit')
}
var obj = {
  filename: 'pickTarget',
  exprt: pickTarget
}
export default obj
// export default pickTarget
