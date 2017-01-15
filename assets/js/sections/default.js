import framework from 'framework'
import config from 'config'
import utils from 'utils'
import $ from 'dom-select'
import event from 'dom-event'
import classes from 'dom-classes'
import query from 'query-dom-components'

class Default {

  constructor(opt = {}) {

    this.view = config.view
    this.page = null
    this.a = null
  }

  init(req, done, options) {

    const opts = options || { cache: true, sub: false }

    const view = this.view
    const ready = this.dataAdded.bind(this, done)
    const page = this.page = utils.biggie.loadPage(req, view, opts, ready)
  }

  dataAdded() {

    this.dom = query({ el: this.page })

    this.a = $.all('a', this.page)

    utils.biggie.addRoutingEL(this.a)
  }
  
  scrollDown() {
    
    const target = config.dom.commands.getBoundingClientRect().height
    
    TweenLite.to('.prompt', 0.5, { scrollTo: target, ease: Power4.easeInOut })
  }

  resize(width, height) {
    
    config.height = height
    config.width = width
    
    this.scrollDown()
  }

  destroy() {

    utils.biggie.removeRoutingEL(this.a)

    this.a = null
  }
}

module.exports = Default
