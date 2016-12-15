import framework from 'framework'
import domselect from 'dom-select'
import utils from 'utils'
import queryDom from 'query-dom-components'
import config from 'config'
import events from 'dom-event'
import classes from 'dom-classes'

class App {

  constructor(opt = {}) {

    this.dom = queryDom({ el: config.body })

    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)

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
    events.on(this.dom.input, 'keydown', this.onKeyPress)
  }

  onKeyPress(e) {

    switch(e.keyCode) {
      case App.KEY_UP:
        if (this.index > 0 && this.index <= config.hist.length) {
          this.index -= 1
          this.dom.input.value = config.hist[this.index]
        }
        break

      case App.KEY_DOWN:
        if (this.index >= 0 && this.index < config.hist.length) {
          this.index += 1
          this.dom.input.value = this.index === config.hist.length ? '' : this.dom.input.value = config.hist[this.index]
        }
        break

      default: break
    }
  }

  onSubmit(e) {

    e.preventDefault()

    const userInput = this.dom.input.value.trim()
    userInput !== '' ? config.hist.push(userInput) : null

    this.index = config.hist.length

    const { commands, social } = window._data

    if (userInput === 'about' || userInput === 'home') {
      // route to appropriate section
      framework.go(commands[userInput])

    } else if (userInput.match(/([1-4])/) && userInput.length === 1) {
      framework.go(commands.projects[userInput])

    } else if (userInput === 'projects') {
      this.printCommandResponseList(commands.projects.list)

    } else if (userInput === 'social') {
      this.printCommandResponseSocial(social)

    } else if (userInput === 'clear') {
      this.dom.commands.innerHTML = ''

    } else if (userInput === '') {
      this.printCommandResponse('')

    } else {
      this.printCommandResponse(commands.error)

    }

    this.dom.input.value = ''
    this.dom.input.focus()
  }

  printCommandResponse(response) {
    const li = document.createElement('li')
    li.innerHTML = response
    classes.add(li, 'segment')
    this.dom.commands.appendChild(li)
  }

  printCommandResponseList(arr) {

    const ul = document.createElement('ul')
    classes.add(ul, 'segment__list')

    arr.forEach(item => {
      const li = document.createElement('li')
      li.innerHTML = item
      ul.appendChild(li)
    })

    this.printCommandResponse(ul.outerHTML)
  }

  printCommandResponseSocial(arr) {

    const info = arr.map(item => {
      if (item.includes('http')) {
        const anchor = document.createElement('a')
        anchor.innerHTML = item
        anchor.href = item
        return anchor.outerHTML
      } else {
        return item
      }
    })

    this.printCommandResponseList(info)
  }
  static get KEY_UP() {
    return 38
  }

  static get KEY_DOWN() {
    return 40
  }
}

module.exports = App
