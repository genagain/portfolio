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
	
	onLoad() {
		const arr = Array.from(document.querySelectorAll('.js-prompt-item'))
		const target = arr[arr.length - 1]
		
		if (!target)
			return
		
		const text = target.innerHTML.slice(0, -6)
		
		target.innerHTML = `${text}done.`
	}

	animateIn(req, done) {

		classes.add(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: _ => {
			done()
			this.onLoad()
		}})
		
		const scale = config.width < 650 ? 'scaleY(.4)' : 'scaleX(.4)'
		
		tl.to(config.dom.prompt, 1.2, { transform: scale, ease: Expo.easeInOut }, 'in')
		tl.to(this.page, 1.2, { autoAlpha: 1, ease: Expo.easeInOut }, 'in')
		tl.staggerFromTo(this.dom.el, 1,  {
			x: config.direction === 'next' ? 400 : -400,
			autoAlpha: 1,
			ease: Expo.easeOut,
			delay: .2
		}, {
			x: 0,
			autoAlpha: 1,
			ease: Expo.easeOut,
			delay: .2
		}, .05, 'in')
		tl.restart()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		req.params.id ?  this.animateOutToSection(done) : this.animateOutToHome(done)
	}

	animateOutToSection(done) {

		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.to(this.page, 1, { autoAlpha: 0, ease: Expo.easeInOut }, 'out')
		tl.staggerTo(this.dom.el, .7, { x: config.direction === 'next' ? -400 : 400,  autoAlpha: 0, ease: Expo.easeIn }, .05, 'out')
		tl.restart()
	}

	animateOutToHome(done) {

		const tl = new TimelineMax({ paused: true, onComplete: _ => {
			done()
			this.onLoad()
		}})
		tl.to(this.page, 1, { autoAlpha: 0, ease: Expo.easeInOut }, 'out')
		tl.staggerTo(this.dom.el, 1, { x: 400, autoAlpha: 0, ease: Expo.easeIn }, -.05, 'out')
		tl.to(config.dom.prompt, 1, { transform: 'none', ease: Expo.easeInOut }, .2, 'out')
		tl.restart()
	}
	
	resize(width, height) {
		
		if (width < 650) {
			config.dom.prompt.style.transform = 'matrix(1, 0, 0, .4, 0, 0)'
		} else {
			config.dom.prompt.style.transform = 'matrix(.4, 0, 0, 1, 0, 0)'
		}
	}

	destroy(req, done) {

		super.destroy()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Section
