import framework from 'framework'
import utils from 'utils'
import config from 'config'
import events from 'dom-event'
import classes from 'dom-classes'
import strftime from 'strftime'

class App {

  constructor(opt = {}) {

    if (config.infos.isDevice) {
      config.body.innerHTML = `<p style="padding:20px;">Typing with only two fingers is hard. Get on a computer!!</p>`
      return
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
    this.addSpaceToDisplay = this.addSpaceToDisplay.bind(this)

    this.init()
  }

  init() {

    this.addEvents()
    framework.init()
    this.renderWelcome()
    config.dom.input.focus()
  }

  addEvents() {

    // listen to submit event
    events.on(config.body, 'click', _ => config.dom.input.focus())
    events.on(config.dom.form, 'submit', this.onSubmit)
    events.on(config.dom.input, 'keydown', this.onKeyPress)
    events.on(config.dom.input, 'keyup', this.addSpaceToDisplay)
    events.on(config.dom.input, 'input', this.updateDisplay)
  }

  renderWelcome() {
    const welcome_ascii = `
 \/$$      \/$$         \/$$                                        \/$$\/$$
| $$  /$ | $$        | $$                                       | $| $$
| $$ \/$$$| $$ \/$$$$$$| $$ \/$$$$$$$ \/$$$$$$ \/$$$$$$\/$$$$  \/$$$$$$| $| $$
| $$\/$$ $$ $$\/$$__  $| $$\/$$_____\/\/$$__  $| $$_  $$_  $$\/$$__  $| $| $$
| $$$$_  $$$| $$$$$$$| $| $$     | $$  \\ $| $$ \\ $$ \\ $| $$$$$$$|__|__\/
| $$$\/ \\  $$| $$_____| $| $$     | $$  | $| $$ | $$ | $| $$_____\/
| $$\/   \\  $|  $$$$$$| $|  $$$$$$|  $$$$$$| $$ | $$ | $|  $$$$$$$/$$/$$
|__\/     \\__\/\\_______|__\/\\_______\/\\______\/|__\/ |__\/ |__\/\\_______|__|__\/
    `
    const currentDatetime = strftime('Last login: %a %b %-d %X on ttys000')
    const prompt = "Hello! It's a pleasure to meet you. I'm Gen. Please type something below"
    this.render(`<pre>${welcome_ascii}</pre>`, 'header')
    // to do some kind of map operation or a welcome template method
    this.render(`<p>&nbsp;</p>`, 'header')
    this.render(`<p>${currentDatetime}</p>`, 'header')
    this.render(`<p>&nbsp;</p>`, 'header')
    this.render(`<p>${prompt}</p>`, 'header')
  }

  onSubmit(e) {

    e.preventDefault()

    const userInput = config.dom.input.value.trim()
    userInput.length !== 0 ? config.hist.push(userInput) : null

    config.dom.input.value = ''
    config.dom.display.innerText = ''
    config.dom.input.focus()

    this.index = config.hist.length

    this.handleUserInput(userInput)
  }

  handleUserInput(userInput) {

    const { commands } = window._data
    const command = commands.hasOwnProperty(userInput) ? commands[userInput] : userInput.length === 0 ? commands.blank : commands.error

    switch(command.type) {
      case 'route':
        framework.go(command.data)
        break

      case 'static':
        const output = command.data[0].href ? command.data.map(this.toAnchor) : command.data
        console.log(this.commandTemplate(userInput, command.prompt, output))
        this.render(this.commandTemplate(userInput, command.prompt, output))
        break

      case 'function':
        !command.template ? this[command.data]() : this.render(this[command.data]())
        break

      default:
        this.render(this.errorTemplate(userInput, commands.error))
    }
  }

  toAnchor(link) {
    return `<a target="_blank" href="${link.href}">${link.text}</a>`
  }

  // refactor render command to render to the header as well with an optional header boolean
  render(template, section = 'commands') {
    const element = section === 'commands' ? config.dom.commands : config.dom.header
    element.innerHTML += template
  }

  blankTemplate() {
    return `
      <li class="command">
        <div class="command__input"></div>
      </li>`
  }

  commandTemplate(userInput, prompt, output) {
    return `
      <li class="command">
        <div class="command__input">${userInput}</div>
        <div class="command__prompt">
          <ul class="command__prompt--list">
            ${prompt.map(item => `<li class="command__prompt--list-item">${item}</li>`).join('')}
          </ul>
        </div>
        <div class="command__output">
          <ul class="command__output--list">
            ${output.map(item => `<li class="command__output--list-item">${item}</li>`).join('')}
          </ul>
        </div>
      </li>`
  }

  errorTemplate(userInput, output) {
    return `
      <li class="command">
        <div class="command__input">${userInput}</div>
        <div class="command__output">
          <ul class="command__output--list">
            ${output.map(item => `<li class="command__output--list-item">-oops '${userInput}': ${item}</li>`).join('')}
          </ul>
        </div>
      </li>`
  }

  clearDisplay() {
    config.dom.commands.innerHTML = ''
  }

  updateDisplay() {
    config.dom.display.innerHTML = config.dom.input.value
  }

  addSpaceToDisplay(e) {
    if (e.keyCode !== App.SPACE) return

    config.dom.display.innerHTML += '<span class="prompt__form--spacer"></span>'
  }

  onKeyPress(e) {

    switch(e.keyCode) {
      case App.KEY_UP:
        if (this.index > 0 && this.index <= config.hist.length) {
          this.index -= 1
          config.dom.input.value = config.hist[this.index]
          this.updateDisplay()
        }
        break

      case App.KEY_DOWN:
        if (this.index >= 0 && this.index < config.hist.length) {
          this.index += 1
          config.dom.input.value = this.index === config.hist.length ? '' : config.dom.input.value = config.hist[this.index]
          this.updateDisplay()
        }
        break

      case App.KEY_LEFT:
        return false
        break

      case App.KEY_RIGHT:
        return false
        break

      case App.TAB:
        return false
        break

      default: break
    }
  }

  static get KEY_LEFT() {
    return 37
  }

  static get KEY_UP() {
    return 38
  }

  static get KEY_RIGHT() {
    return 39
  }

  static get KEY_DOWN() {
    return 40
  }

  static get TAB() {
    return 9
  }

  static get SPACE() {
    return 32
  }
}

module.exports = App
