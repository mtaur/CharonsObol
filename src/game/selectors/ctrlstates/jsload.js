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
    console.log('cacheing', cache[key].default)
  }
}

// Usage:
// import { classdir as better_name } from 'jsload'
export { classdir }
