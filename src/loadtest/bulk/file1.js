var dog = 'doge initialized'
console.log(dog)

export default class Doge {
  constructor () {
    this.bark = () => { console.log('woof') }
    this.name = 'Good Boy'
  }
}
