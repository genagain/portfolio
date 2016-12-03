import framework from 'framework'
import domselect from 'dom-select'
import utils from 'utils'
import queryDom from 'query-dom-components'
import config from 'config'
import events from 'dom-event'

class App {

  constructor(opt = {}) {

    this.dom = queryDom({ el: config.body })

    this.init()
  }

  init() {

    this.addEvents()
    framework.init()
  }

  addEvents() {

    utils.biggie.addRoutingEL(domselect.all('nav a'))
    // add submit event listener

    events.on(this.dom.submit, 'submit', this.onSubmit, this)

    // check the value of the input once the submit event lister is trigger
    // map the value to a route
  }

  onSubmit(e) {

    console.log('submit')
    return false
  }

}

module.exports = App
