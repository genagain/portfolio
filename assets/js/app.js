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

    const userInput = this.dom.input.value.trim()
    config.commandHistory.push(userInput)

    const { commands } = window._data

    if (userInput === 'about' || userInput === 'home') {
      // route to appropriate section
      framework.go(commands[userInput])

    } else if (userInput.match(/([1-4])/) && userInput.length === 1) {
      framework.go(commands.projects[userInput])

    } else if (userInput === 'projects') {
      this.printCommandResponseList(commands.projects.list)

    } else if (userInput === 'clear') {
      this.dom.commandHistory.innerHTML = ''

    } else if (userInput === '') {
      return

    } else {
      this.printCommandResponse(commands.error)
    }

    this.dom.input.value = ''
    this.dom.input.focus()
  }

  printCommandResponse(response) {

    const li = document.createElement('li')

    li.innerHTML = response

    this.dom.commandHistory.appendChild(li)
  }

  printCommandResponseList(arr) {

    arr.forEach(x => {

      this.printCommandResponse(x)
    })
  }
}

module.exports = App
