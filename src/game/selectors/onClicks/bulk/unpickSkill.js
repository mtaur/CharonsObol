// import x from y.js

var unpickSkill = function (selector, skill) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  //
  // The following line is not needed:
  // selector.stateData.activeUnit = unit
  console.log('Unselected the skill', skill.name)
  selector.stateData.activeSkill = {}
  selector.changeState('ChooseAction')
}
var obj = {
  filename: 'unpickSkill',
  exprt: unpickSkill
}
export default obj
// export default makeActive
