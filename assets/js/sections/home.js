import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

class Home extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'home'
		this.dom = null
	}

	init(req, done) {

		super.init(req, done)
		
		config.dom.input.focus()
	}

	dataAdded(done) {

		super.dataAdded()

		done()
	}

	animateIn(req, done) {

		classes.add(config.body, `is-${this.slug}`)

		done()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		done()
	}

	destroy(req, done) {

		super.destroy()

		this.dom = null

		done()
	}
}

module.exports = Home
