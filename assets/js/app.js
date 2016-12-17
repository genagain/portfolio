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

  onSubmit(e) {

    e.preventDefault()

    const userInput = this.dom.input.value.trim()
    userInput !== '' ? config.hist.push(userInput) : null

    this.index = config.hist.length

    this.handleUserInput(userInput)

    this.dom.input.value = ''
    this.dom.input.focus()
  }

  handleUserInput(userInput) {

    const { commands } = window._data
    const command = commands.hasOwnProperty(userInput) ? commands[userInput] : userInput.length === 0 ? commands["blank"] : commands["error"]

    switch(command.type) {
      case 'route':
        framework.go(command.data)
        break

      case 'static':
        const output = command.data[0].href ? command.data.map(this.toAnchor) : command.data
        this.printCommand(userInput, output)
        break

      case 'function':
        this[command.data]()
        break

      default:
        this.printCommand(userInput, commands.error)
    }
  }

  toAnchor(link) {
    return `<a target="_blank" href="${link.href}">${link.text}</a>`
  }

  clearDisplay() {
    this.dom.commands.innerHTML = ''
  }

  addBlankSegment(userInput) {
    const template = `
      <li class="command">
        <div class="command__input"></div>
      </li>`

    this.render(template)
  }

  printCommand(userInput, output) {

    const template = `
      <li class="command">
        <div class="command__input">${userInput}</div>
        <div class="command__output">
          <ul class="command__output--list">
            ${output.map(item => `<li class="command__output--list-item">${item}</li>`).join('')}
          </ul>
        </div>
      </li>`

    this.render(template)
  }

  render(template) {
    const html = new DOMParser()
      .parseFromString(template, 'text/html')
      .querySelector('.command')

    this.dom.commands.appendChild(html)
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

  static get KEY_UP() {
    return 38
  }

  static get KEY_DOWN() {
    return 40
  }
}

module.exports = App
