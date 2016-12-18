import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

class Section extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'section'
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

		const tl = new TimelineMax({paused: true, onComplete: done})
		tl.to(config.dom.prompt, .7, { transform: 'scaleX(.4)', ease: Expo.easeInOut })
		tl.to(this.page, 1, { autoAlpha: 1, ease: Expo.easeOut }, '-=.7')
		tl.restart()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({paused: true, onComplete: done})
		tl.to(config.dom.prompt, .7, { transform: 'none', ease: Expo.easeInOut })
		tl.to(this.page, .7, { autoAlpha: 0, ease: Expo.easeOut, clearProps: 'all' }, '-=.7')
		tl.restart()
	}

	destroy(req, done) {

		super.destroy()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Section
