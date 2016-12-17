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
	}

	dataAdded(done) {

		super.dataAdded()

		done()
	}

	animateIn(req, done) {

		classes.add(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.to(config.dom.prompt, .7, { transform: 'none', ease: Expo.easeInOut })
		tl.restart()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.to(config.dom.prompt, .7, { transform: 'scaleX(.4)', ease: Expo.easeInOut })
		tl.restart()
	}

	destroy(req, done) {

		super.destroy()

		this.dom = null

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Home
