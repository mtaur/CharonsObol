var promisifier = function (obj) {
  // (fcn, newDat = '', succ = () => true, old = [], fail = () => false) {
  // var _data = data.push(fcn(data))
  if (!obj.data) { obj.data = [] }
  console.log('Current data: ' + obj.data)
  if (obj.newDat) { obj.data.unshift(obj.newDat) }
  return new Promise((resolve, reject) => {
    obj.succ(obj, resolve)
    // resolve(fcn(data))
  })
}

function waitFive (obj, res, rej = null) {
  setTimeout(res, 5000, obj)
}

function logAll (obj) {
  obj.fcn()
  console.log(obj.data)
}

var food = {}
food.data = ['pineapple']
food.newDat = 'donut'
food.fcn = () => { console.log('Hungry for: ', food.data, food) }
food.succ = waitFive

promisifier(food)
  .then(promisifier).then(promisifier).then(promisifier).then(logAll)
