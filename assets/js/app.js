import framework from 'framework'
import utils from 'utils'
import config from 'config'
import events from 'dom-event'
import classes from 'dom-classes'
import strftime from 'strftime'
import ScrollToPlugin from '../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js'

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
    const currentDatetime = strftime('Last login: %a %b %-d %X on ttys000')
    config.dom.datetime.innerHTML += currentDatetime
  }

  addEvents() {

    // listen to submit event
    events.on(config.body, 'click', _ => config.dom.input.focus())
    events.on(config.dom.form, 'submit', this.onSubmit)
    events.on(config.dom.input, 'keydown', this.onKeyPress)
    events.on(config.dom.input, 'keyup', this.addSpaceToDisplay)
    events.on(config.dom.input, 'input', this.updateDisplay)
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
        if (userInput === 'home' || this.validateProjectUsage()) {
          framework.go(command.data)
          this.render(this.commandTemplate(userInput, command.prompt, []))
        } else {
          this.render(this.errorTemplate(userInput, commands.error))
        }
        break

      case 'static':
        const output = command.data[0].href ? command.data.map(this.toAnchor) : command.data
        this.render(this.commandTemplate(userInput, command.prompt, output))
        break

      case 'function':
        !command.template ? this[command.data]() : this.render(this[command.data]())
        break

      default:
        this.render(this.errorTemplate(userInput, commands.error))
    }
  }

  validateProjectUsage() {
    return config.hist.join('').match(/projects\d+$/)
  }

  toAnchor(link) {
    return `<a target="_blank" href="${link.href}">${link.text}</a>`
  }

  render(template, section = 'commands') {
    const element = section === 'commands' ? config.dom.commands : config.dom.header
    element.innerHTML += template
    
    this.scrollDown()
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
            ${prompt.map(item => `<li class="command__prompt--list-item js-prompt-item">${item}</li>`).join('')}
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
    config.dom.header.innerHTML = ''
    config.dom.commands.innerHTML = ''
  }

  updateDisplay() {
    config.dom.display.innerHTML = config.dom.input.value
  }

  addSpaceToDisplay(e) {
    if (e.keyCode !== App.SPACE) return

    config.dom.display.innerHTML += '<span class="prompt__form--spacer"></span>'
  }
  
  scrollDown() {
    
    const target = config.dom.commands.getBoundingClientRect().height
    
    TweenLite.to('.prompt', 0.5, { scrollTo: target, ease: Power4.easeInOut })
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
