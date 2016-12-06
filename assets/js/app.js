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

    this.dom.input.focus()
  }

  addEvents() {

    utils.biggie.addRoutingEL(domselect.all('nav a'))

    // listen to submit event
    events.on(this.dom.form, 'submit', this.onSubmit)
  }

  onSubmit(e) {

    e.preventDefault()

    const userInput = this.dom.input.value
    const { commands } = window._data

    let validCommand = false

    while (!validCommand) {

      if (userInput === 'about' || userInput === 'home') {

        // route to appropriate section
        framework.go(commands[userInput])

        validCommand = true

      } else if (userInput === 'projects') {

        console.log('projects')

        validCommand = true
      } else if (userInput === '') {

        validCommand = true
      } else {

        console.log(commands.error)

        validCommand = true
      }
    }

    this.dom.input.value = ''
    this.dom.input.focus()
  }

}

module.exports = App
