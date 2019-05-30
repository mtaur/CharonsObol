// import x from y.js

var makeActive = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  selector.stateData.activeUnit = unit
  selector.stateData.activeSkill = {}
  selector.changeState('ChooseAction')
}

export default makeActive
