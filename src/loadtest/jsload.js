// Import the default export of each file in the local /bulk folder
// Store each as a property of classdir object

const rContext = require.context('./bulk', false, /\.js$/)
var cache = {}

function importAll (r) {
  r.keys().forEach(key => { cache[key] = r(key) })
}

importAll(rContext)

// Cache default object from each file in /bulk folder
var classdir = {}

// destructure cache to store only by class name
for (var key in cache) {
  if (cache[key].default) {
    let obj = cache[key].default
    classdir[obj.name] = obj
  }
}

// Usage:
// import { classdir as better_name } from 'jsload'
export { classdir }

// 
// console.log(classdir)
//
// // var Doge = cache['./file1.js'].default
// var Doge = classdir['Doge']
// var Catto = classdir['Catto']
// var kitteh = new Catto()
// kitteh.meow()
// var doge5 = new Doge()
// doge5.bark()
// console.log(doge5.name)
// doge5.bark()
// // var doge3 = new cache.Doge()
// // doge3.bark()
