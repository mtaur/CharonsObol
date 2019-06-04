// import x from y.js

var deactivate = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  selector.stateData.activeUnit = {}
  selector.stateData.activeSkill = {}
  selector.changeState('ChooseUnit')
}
var obj = {
  filename: 'deactivate',
  exprt: deactivate
}
export default obj
// export default deactivate
