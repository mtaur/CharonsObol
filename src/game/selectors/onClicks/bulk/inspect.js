// import x from y.js

var inspect = function (selector, unit) {
  // stateData = {
  //   // activeUnit = {}
  //   // skill = {}
  //   // (skill will have info about valid click targets and number of steps)
  //   // targets[i] = target clicked at step i
  // }
  if (selector.stateData.inspectUnit.id === unit.id) {
    selector.stateData.inspectUnit = {}
    alert(unit.name + ', id ' + unit.id + ', uninspected!')
  } else {
    selector.stateData.inspectUnit = unit
    alert(unit.name + ', id ' + unit.id + ', inspected!')
  }
  // selector.changeState('CHOOSEACTION')
}

export default inspect
