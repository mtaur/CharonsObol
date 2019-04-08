var cat = 'catto initialized'
console.log(cat)

export default class Catto {
  constructor () {
    this.meow = () => { console.log('meow') }
    this.name = 'Kitteh'
  }
}
