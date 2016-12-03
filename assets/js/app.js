import framework from 'framework'
import domselect from 'dom-select'
import utils from 'utils'
import queryDom from 'query-dom-components'
import config from 'config'
import events from 'dom-event'

class App {

  constructor(opt = {}) {

    this.dom = queryDom({ el: config.body })

    this.onSubmit = this.onSubmit.bind(this)

    this.init()
  }

  init() {

    this.addEvents()
    framework.init()
  }

  addEvents() {

    utils.biggie.addRoutingEL(domselect.all('nav a'))

    // listen to submit event
    events.on(this.dom.form, 'submit', this.onSubmit)
  }

  onSubmit(e) {

    e.preventDefault()
    
    console.log('submit')
  }

}

module.exports = App
