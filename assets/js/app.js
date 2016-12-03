import framework from 'framework'
import domselect from 'dom-select'
import utils from 'utils'

class App {

  constructor(opt = {}) {

    this.init()
  }

  init() {

    this.addEvents()
    framework.init()
  }

  addEvents() {

    utils.biggie.addRoutingEL(domselect.all('nav a'))
  }
}

module.exports = App
