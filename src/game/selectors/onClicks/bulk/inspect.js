// import x from y.js

var inspect = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  selector.stateData.inspectUnit = unit
  // selector.changeState('CHOOSEACTION')
}

export default inspect
