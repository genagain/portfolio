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
		tl.to(config.dom.prompt, 1.2, { transform: 'scaleX(.4)', ease: Expo.easeInOut }, 'in')
		tl.to(this.page, 1.2, { autoAlpha: 1, ease: Expo.easeInOut }, 'in')
		tl.staggerTo(this.dom.el, 1, { x: 0, autoAlpha: 1, ease: Expo.easeOut, delay: .2 }, .05, 'in')
		tl.restart()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		req.route === '/' ? this.animateToHome(done) : this.animateToSection(done)
	}

	animateToHome(done) {

		const tl = new TimelineMax({paused: true, onComplete: done})
		tl.to(this.page, 1, { autoAlpha: 0, ease: Expo.easeInOut }, 'out')
		tl.staggerTo(this.dom.el, 1, { autoAlpha: 0, x: 400, ease: Expo.easeIn }, -.05, 'out')
		tl.to(config.dom.prompt, 1, { transform: 'none', ease: Expo.easeInOut }, .2, 'out')
		tl.restart()
	}

	animateToSection(done) {

		const tl = new TimelineMax({paused: true, onComplete: done})
		tl.to(this.page, 1, { autoAlpha: 0, ease: Expo.easeInOut }, 'out')
		tl.staggerTo(this.dom.el, .7, { autoAlpha: 0, x: -400, ease: Expo.easeIn }, .05, 'out')
		tl.restart()
	}

	destroy(req, done) {

		super.destroy()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Section
