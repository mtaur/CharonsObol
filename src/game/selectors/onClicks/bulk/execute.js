// import x from y.js

var execute = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  selector.stateData.activeSkill.prevTargs.push(unit)
  selector.stateData.activeSkill.targetRules.shift()
  console.log('Execute!')
  console.log('Skill:', selector.stateData.activeSkill.name)
  console.log('Targets:', selector.stateData.activeSkill.prevTargs)
  selector.stateData.activeUnit = {}
  selector.stateData.activeSkill = {}
  selector.stateData.inspectUnit = {}
  selector.stateData.skill = {}
  selector.changeState('ChooseUnit')
}

export default execute
