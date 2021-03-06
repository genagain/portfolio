import config from 'config'
import ajax from 'please-ajax'
import classes from 'dom-classes'
import create from 'dom-create-element'
import gsap from 'gsap'

class Preloader {

	constructor(onComplete) {

		this.preloaded = onComplete
		this.view = config.view
		this.el = null
	}

	init(req, done) {

		classes.add(config.body, 'is-loading')

    ajax.get(`${config.BASE}data/data.json`, {
      success: (object) => {
        window._data = object.data
        done()
      }
    })

		this.createDOM()

		done()
	}

	createDOM() {

		const page = this.view.firstChild

		this.el = create({
			selector: 'div',
			styles: 'preloader',
			html: `<p>initializing...</p>`
		})

		config.body.appendChild(this.el)
	}

	resize(width, height) {

		config.width = width
		config.height = height
	}

	animateIn(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: () => {
			done()
			this.preloaded()
		}})
		tl.to(this.el, 1, {autoAlpha: 1})
		tl.restart()
	}

	animateOut(req, done) {
		
		const intro = [config.dom.header, config.dom.form]

		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.to(this.el, 0, {autoAlpha: 0})
		tl.to(intro, 0, {autoAlpha: 1})
		tl.restart()
	}

	destroy(req, done) {

		classes.add(config.body, 'is-loaded')
		classes.remove(config.body, 'is-loading')

		config.body.removeChild(this.el)

		done()
	}
}

module.exports = Preloader
